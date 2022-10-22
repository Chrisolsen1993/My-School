import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentsService } from 'src/app/pages/departments/departments.service';
import { Department } from 'src/app/types/types';
import { FormPostService } from './form-post.service';

const badWords: string[] = ['foo', 'boo'];

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.css'],
})
export class FormPostComponent implements OnInit {
  departmentList: Department[] = [];

  postForm = new FormGroup({
    postTitle: new FormControl('', [
      Validators.required,
      this.restrictedWords(badWords),
    ]),
    postDescription: new FormControl('', [
      Validators.required,
      this.restrictedWords(badWords),
    ]),
    isEvent: new FormControl(false),
    eventDate: new FormControl(null),
    departmentId: new FormControl(null),
  });

  constructor(
    private postFormService: FormPostService,
    private departmentsService: DepartmentsService
  ) {}

  ngOnInit() {
    if (this.departmentsService.departments.length === 0)
      this.departmentsService.queryDepartment();
    this.departmentList = this.departmentsService.departments;
  }

  onSubmit() {
    if (this.postForm.valid) {
      const title: any = this.postForm.controls.postTitle.value;
      const description: any = this.postForm.controls.postDescription.value;
      const isPostEvent: any = this.postForm.controls.isEvent.value;
      const selectedDepartmentId: any =
        this.postForm.controls.departmentId.value;
      const eventDate: any = this.postForm.controls.eventDate.value;
      this.postFormService.addPost(
        title,
        description,
        isPostEvent,
        selectedDepartmentId,
        eventDate
      );
    }
  }
  restrictedWords(words: string[]) {
    return (control: FormControl): { [key: string]: any } | null => {
      if (!words) return null;

      let invalidWords = words
        .map((w) => (control.value.includes(w) ? w : null))
        .filter((w) => w != null);

      return invalidWords && invalidWords.length > 0
        ? { restrictedWords: invalidWords.join(', ') }
        : null;
    };
  }
}
