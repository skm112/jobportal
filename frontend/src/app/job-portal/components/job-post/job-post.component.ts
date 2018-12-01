import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import * as $ from "jquery";
import { JobPostService } from "../../../service/job-post.service";

@Component({
  selector: "app-job-post",
  templateUrl: "./job-post.component.html",
  styleUrls: ["./job-post.component.scss"]
})
export class JobPostComponent implements OnInit {
  arrTable: any[] = [];
  inputForm: FormGroup;
  loading = false;
  submitted = false;
  filename: string;
  imageData: string;
  items: FormArray;
  docs: any = [];
  minDate: Date;
  maxDate: Date;
  checked: boolean;
  username = localStorage.getItem("username");
  addCustomSkills = term => ({ id: term, skill: term });
  skills = [
    { id: "angular", skill: "Angular" },
    { id: "react", skill: "React" },
    { id: "vue", skill: "Vue" },
    { id: "jquery", skill: "Jquery" }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private jobpostService: JobPostService,
    private router: Router
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 8);
  }

  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      username: "",
      Jobtitle: ["", Validators.required],
      Jobtype: ["hourly", Validators.required],
      Jobprice: ["", [Validators.required]],
      skills: ["", Validators.required],
      description: [""],
      Job_no_of_freelancer_required: ["", Validators.required],
      Job_Start_Date: ["", Validators.required],
      Job_Closed_Date: ["", Validators.required],
      Job_visibility: ["public", Validators.required],
      items: this.formBuilder.array([this.createItem()])
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: "",
      filename: "",
      avtar: ""
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.inputForm.controls;
  }

  onfileChange(event, i) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        let obj = {
          filename: file.name,
          filetype: file.type,
          blobdata: reader.result.split(",")[1]
        };
        this.docs.push({ name: $("#name" + i).val(), avtar: obj });
      };
    }
  }

  addItem(): void {
    this.items = this.inputForm.get("items") as FormArray;
    this.items.push(this.createItem());
  }

  //-------------------
  onSubmit() {
    console.log("submit");
    this.inputForm.value.items = this.docs;
    this.inputForm.value.username = this.username;
    this.submitted = true;
    if (this.inputForm.invalid) {
      console.log("submit");

      return;
    }

    this.loading = true;
    this.jobpostService.savejob(this.inputForm.value).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl("/jobportal/showjob/" + this.username);
      },
      error => {
        this.loading = false;
      }
    );
  }

  cancel() {
    this.inputForm.reset();
  }
  
}
