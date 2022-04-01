import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import * as CryptoJS from 'crypto-js';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { FileValidatorService } from 'src/app/services/file-validator/file-validator.service';

@Component({
  selector: 'app-file-validator',
  templateUrl: './file-validator.component.html',
  styleUrls: ['./file-validator.component.scss']
})
export class FileValidatorComponent implements OnInit {
  submitted = false;
  matadatas: any = [];
  search: any = '';
  file: any;
  user: any;
  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private fileValidatorService: FileValidatorService,
    private toastService: ToastrService,
    ) {}

  ngOnInit(): void {
    

  }

  getList(SearchVal : any){
    this.spinner.show();
    
    this.fileValidatorService.findMetadataToHash(SearchVal).subscribe(
      (response: any) => {
        this.matadatas = response['result'];
        if(response['result'].length ==0){
          this.toastService.error('File is not exsit !');
        }
        this.spinner.hide();
      },
      (error: any) => {
        this.toastService.success(error);
        this.spinner.hide();
      }
    );
  }

  uploadFile() {
    $("#fileChoosen").trigger('click');
  }

  fileChoosen(event: any) {
    if (event.target.value) {
      if (event.target.files[0].type != 'application/pdf') {
        this.toastService.error('PDF file is requered');
        return;
      }
      this.spinner.show();
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      this.matadatas = [];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        // get sha256 file hash
        var fileBase64 = reader.result?.toString().split('base64,')[1];
        var hash = CryptoJS.SHA256(fileBase64+"").toString();
        $('#SearchVal').val(hash);
        this.search = hash;
        this.searchFn();
      };
    }
  }

  searchFn() {
    this.search.toString().length >= 64? this.getList(this.search): this.matadatas=[];
  }

  onNavigate(param:any){
    window.open("https://explorer.solana.com/tx/"+param+"?cluster=devnet", "_blank");
  }

  solModel(content: any, param:any) {
    this.modalService.open(content, { size: 'xl', centered: true });
    $("#solIframe").attr('style', 'height:'+(window.innerHeight-120) + 'px;width: 100%;');
    $("#solIframe").attr('src', "https://explorer.solana.com/tx/"+param+"?cluster=devnet");
  }

}
