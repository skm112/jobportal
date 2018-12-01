import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SigninService } from '../../service/signin.service';
import { UniversityService } from '../../service/university.service';
import { AreaOfstudyService } from '../../service/area-ofstudy.service';
import { DegreeService } from '../../service/degree.service';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  public username: string;
  username1: string = localStorage.getItem('username')

  educationForm: FormGroup;
  public edulist: any[] = [];
  public streamlist: any[] = [];
  public degree: any[] = [];
  submitted = false;
  minDate: Date;
  maxDate: Date;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private signinService: SigninService,
    private universityService: UniversityService,
    private streamService: AreaOfstudyService,
    private degreeService: DegreeService,

  ) {
    this.route.params.subscribe(params => {
      this.username = params["username"];
      console.log(this.uName());

    });

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
  }

  uName() {
    if (this.username == this.username1) {
      return this.username
    }
    return this.username1;


  }

  getData() {//for typehead
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

  ngOnInit() {
    //@form group
    this.educationForm = this.formBuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
      qualification: ['', Validators.required],
      area_of_study: ['', Validators.required],
      period_from: ['', Validators.required],
      period_to: ['', Validators.required],
      description: [''],
      web_page: [''],
    });
    this.getData()

  }

  // convenience getter for easy access to form fields
  get f() { return this.educationForm.controls; }

  onSubmit() {
    console.log("submit");
    this.submitted = true;
    // stop here if form is invalid
    if (this.educationForm.invalid) {
      return;
    }
    this.signinService.saveData(this.username, this.educationForm.value).pipe(first()).subscribe(data => {
      // console.log(data);
      this.router.navigate(['/user/profile']);

    },
      error => {

        console.log(error);

      });




  }

}
