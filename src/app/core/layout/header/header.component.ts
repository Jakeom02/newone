import { Component, OnChanges, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// import { UiStyleToggleService } from '../../services/ui-style-toggle.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class NavHeaderComponent implements OnInit {
  public pushRightClass: string;
  product: any = [];
  noOfCartProduct: any = 0;
  address: any = 'Address..';
  clientId: any;
  client: any;
  user: any;
  constructor(
    public router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    
    private modalService: NgbModal // private uiStyleToggleService: UiStyleToggleService
  ) {
    this.router.events.subscribe((val) => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit(): void {
    this.pushRightClass = 'push-right';
    this.getClientDetailsById();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  isToggled(): boolean {
    const dom: any = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar(): void {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }
  getClientDetailsById() {
    this.spinner.show();
    
  }
}
