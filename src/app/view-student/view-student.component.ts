import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../service/web-api.service';
import { HttpProviderService } from '../service/http-provider.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {

  studentId: any;
  studentDetail : any= [];
   
  constructor(public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider : HttpProviderService) { }
  
  ngOnInit(): void {
    this.studentId = this.route.snapshot.params["studentId"];      
    this.getStudentDetailById();
  }

  getStudentDetailById() {       
    this.httpProvider.getStudentDetailById(this.studentId).subscribe((data : any) => {      
      if (data != null &&  data.body.result!= null) {
        var resultData =  data.body.result.response;
        if (resultData) {
          this.studentDetail = resultData;
        }
      }
    },
    (error :any)=> { }); 
  }

}