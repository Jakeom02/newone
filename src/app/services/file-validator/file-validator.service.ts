import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileValidatorService {

  constructor(private http: HttpClient) { }


  findMetadataToHash(obj: any) {
//    return this.http.get(environment.Base_URL.replace('/api','/test') + '/metadata/findMetadataToHash/'+obj);
return this.http.get(environment.Base_URL + '/metadata/findMetadataToHash/'+obj);
  }
}
