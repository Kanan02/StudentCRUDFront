import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import { apiUrl } from '../../environments/environment'

var httpLink = apiUrl+"/students";

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllStudent(): Observable<any> {
    return this.webApiService.get(httpLink);
  }
  public deleteStudentById(model: any): Observable<any> {
    return this.webApiService.delete(httpLink + '?studentId=' + model);
  }
  public getStudentDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink + '?employeeId=' + model);
  }
  public addStudent(model: any): Observable<any> {
    return this.webApiService.post(httpLink, model);
  }  
  public updateStudent(model: any): Observable<any> {
    return this.webApiService.put(httpLink, model);
  }  
}                          