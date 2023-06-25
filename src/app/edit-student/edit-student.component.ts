import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  editStudentForm: studentForm = new studentForm();

  @ViewChild("studentForm")
  studentForm!: NgForm;

  isSubmitted: boolean = false;
  studentId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['studentId'];
    this.getStudentDetailById();
  }
  getStudentDetailById() {
    this.httpProvider.getStudentDetailById(this.studentId).subscribe((data: any) => {
      if (data != null && data.result != null) {
        var resultData = data.result.response;
        if (resultData) {
          this.editStudentForm.Id = resultData.id;
          this.editStudentForm.FullName = resultData.fullName;
          this.editStudentForm.Average = resultData.average;
          this.editStudentForm.DateOfBirth = resultData.dateOfBirth;
        }
      }
    },
      (error: any) => { });
  }

  EditStudent(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.updateStudent(this.editStudentForm).subscribe(async data => {
        if (data != null && data.result != null) {
          var resultData = data.result;
          if (resultData != null) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}
export class studentForm {
  Id: string = "";
  FullName: string = "";
  Average: number = 0;
  DateOfBirth: string = "";
}