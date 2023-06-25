import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import { apiUrl } from 'src/environments/environment';

var httpLink = apiUrl+"/students";

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllStudent(page:number,limit:number,fullName:string): Observable<any> {
    if (!fullName) {
      return this.webApiService.get(httpLink+'?Page='+page+'&Limit='+limit);
    }
    return this.webApiService.get(httpLink+'?FullName='+fullName+'&Page='+page+'&Limit='+limit);
  }
  public deleteStudentById(model: any): Observable<any> {
    return this.webApiService.delete(httpLink + '/' + model);
  }
  public getStudentDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink + '/' + model);
  }
  public addStudent(model: any): Observable<any> {
    return this.webApiService.post(httpLink, model);
  }  
  public updateStudent(model: any): Observable<any> {
    return this.webApiService.put(httpLink, model);
  }  
}                          