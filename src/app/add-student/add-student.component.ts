import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  addStudentForm: studentForm = new studentForm();

  @ViewChild("studentForm")
  studentForm!: NgForm;
  isSubmitted: boolean = false;
  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {  
  }

  AddStudent(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.addStudent(this.addStudentForm).subscribe(async data => {
        console.log(data);
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && !resultData.isError) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
          //  this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}

export class studentForm {
  FullName: string = "";
  Average: number = 0;
  DateOfBirth: string = "";
}