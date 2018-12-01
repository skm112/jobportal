import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { SigninService } from '../../service/signin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from '../../service/university.service';
import { AreaOfstudyService } from '../../service/area-ofstudy.service';
import { DegreeService } from '../../service/degree.service';
import { Education } from '../../models/Education';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-educational-details',
  templateUrl: './educational-details.component.html',
  styleUrls: ['./educational-details.component.css']
})
export class EducationalDetailsComponent implements OnInit {
  eduObj: Education;
  arrEdu: Education[];
  public username: string;
  educationForm: FormGroup;
  public edulist: any[] = [];
  public streamlist: any[] = [];
  public degree: any[] = [];
  submitted = false;
  minDate: Date;
  maxDate: Date;
  username1: string = localStorage.getItem('username')
  show: boolean = false;

  constructor(private eduService: SigninService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private universityService: UniversityService,
    private streamService: AreaOfstudyService,
    private degreeService: DegreeService, ) {
    this.route.params.subscribe(params => {
      this.username = params["username"];
    });
    this.getData();
    console.log(this.username);
    console.log(this.username1);

  }

  uName() {
    if (this.username == this.username1) {
      return this.username
    }
    return this.username1;
  }

  getData() {
    let obj = { username: this.uName() }
    this.eduService.getEduData(obj).subscribe(data => {
      this.arrEdu = [data][0].education;
      // console.log(this.arrEdu);
    })
    this.universityService.getdata().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].name + " (" + data[i].alpha_two_code + ")");
        this.edulist.push({ name: data[i].name + " (" + data[i].alpha_two_code + ")" })
      }
    })
    this.streamService.getdata().subscribe(data => {
      this.streamlist = data;
    })
    this.degreeService.getdata().subscribe(data => {
      this.degree = data;
    })
  }

  delete(obj) {
    if (confirm("Are you sure to delete")) {
      let obj1 = { username: this.uName(), id: obj._id };
      console.log(obj1);

      this.eduService.deleteEduData(obj1).subscribe(obj => {
        // console.log(obj);
        this.getData();
      });
    }

  }

  edit(obj) {
    console.log(obj);
    console.log(this.datePipe.transform(obj.period_from, 'd MMMM yyyy, h:mm:ss a'));
    // 'Do MMMM YYYY,h:mm:ss a'
    this.show = true;
    this.educationForm.patchValue(obj);
    //S this.educationForm.valu.period_from=
    this.educationForm.controls.period_from.setValue(this.datePipe.transform(obj.period_from, 'dd MMMM yyyy, h:mm:ss a'))
    this.educationForm.controls.period_to.setValue(this.datePipe.transform(obj.period_to, 'dd MMMM yyyy, h:mm:ss a'))

  }

  ngOnInit() {

    this.educationForm = this.formBuilder.group({
      name: ['', Validators.required],

      school_location: new FormGroup({
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        pincode: new FormControl('', Validators.required),
      }),
      qualification: ['', Validators.required],
      area_of_study: ['', Validators.required],
      period_from: ['', Validators.required],
      period_to: ['', Validators.required],
      description: [''],
      web_page: [''],
      _id: null
    });

    this.getData()
  }
  cancel() {
    this.show = false
  }
  get f() { return this.educationForm.controls; }
  // get f1() { return this.educationForm.controls.school_location; }
  // orderForm.controls.items.controls[i].controls.name.value
  onSubmit() {
    console.log("submit");
    this.submitted = true;
    // stop here if form is invalid
    if (this.educationForm.invalid) {
      return;
    }
    this.eduService.updateEduData(this.uName(), this.educationForm.value).pipe(first()).subscribe(data => {
      // console.log(data);
      // this.router.navigate(['/home']);
      this.show = false;
      this.getData();
    },
      error => {

        console.log(error);

      });
  }

}
