import { Component, OnInit } from "@angular/core";
import { JobPostService } from "../../../service/job-post.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import * as $ from "jquery";
import { first } from "rxjs/operators";

@Component({
  selector: "app-show-job",
  templateUrl: "./show-job.component.html",
  styleUrls: ["./show-job.component.scss"]
})
export class ShowJobComponent implements OnInit {
  arrTable: any[] = [];
  show: boolean = false;
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  // dropdownList = [];
  // selectedItems = [];
  // dropdownSettings = {};
  imageData: string;
  items: FormArray;
  docs: any = [];
  username = localStorage.getItem("username");
  docs1: any = [];
  addCustomSkills = term => ({ id: term, skill: term });
  skills = [
    { id: "anjmao", skill: "Anjmao" },
    { id: "varnas", skill: "Varnas" }
  ];

  // public user_id: string;
  // public user: string;
  constructor(
    private formBuilder: FormBuilder,
    private jobpostService: JobPostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      // this.user_id = params["user_id"];
      // this.user = params["username"];
      // console.log("userid");
      // console.log(this.user_id);
      // console.log("username");
      // console.log(this.username);
      if (this.username) {
        this.getdata();
      }
    });
  }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      username: "",
      Jobtitle: ["", Validators.required],
      Jobtype: ["", Validators.required],
      Jobprice: ["", [Validators.required]],
      skills: ["", Validators.required],
      description: [""],
      Job_no_of_freelancer_required: ["", Validators.required],
      // Jobstatus: ["", Validators.required],
      Job_Start_Date: ["", Validators.required],
      Job_Closed_Date: ["", Validators.required],
      Job_visibility: ["", Validators.required],
      items: this.formBuilder.array([this.createItem()]),
      _id: null
    });
  }

  createItem(obj = null): FormGroup {
    if (obj == null) {
      return this.formBuilder.group({
        name: "",
        filename: "",
        avtar: ""
      });
    } else {
      return this.formBuilder.group({
        name: obj.name,
        filename: "",
        avtar: obj.avtar
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateForm.controls;
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

  addItem(obj = null): void {
    this.items = this.updateForm.get("items") as FormArray;
    this.items.push(this.createItem(obj));
  }

  //-------------------------
  edit(obj) {
    this.docs1 = [];
    this.items = this.updateForm.get("items") as FormArray;
    for (let i = 0; i < this.items.length; i++) {
      this.items.removeAt(i);
    }
    this.items.removeAt(0);

    for (let i = 0; i < obj.docs.length; i++) {
      this.addItem(obj.docs[i]);
      this.docs1.push(obj.docs[i].avtar);
    }
    console.log("obj");
    console.log(obj);
    this.show = true;
    this.skills = obj.skills;
    this.updateForm.patchValue(obj);
  }
  getdata() {
    let obj = { username: this.username };
    this.jobpostService.Getjob(obj).subscribe(data => {
      console.log("getdata");
      console.log(data);
      this.arrTable = data;
      console.log("arrtable");
      console.log(this.arrTable);
    });
  }

  onSubmit() {
    this.updateForm.value.items = this.docs;
    this.updateForm.value.username = this.username;
    console.log(this.updateForm.value.items);

    console.log(this.updateForm.value._id);

    this.submitted = true;
    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }
    this.loading = true;
    this.jobpostService
      .updatejob(this.updateForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.getdata();
          this.show = false;
          this.submitted = false;
          this.loading = false;
          //
        },
        error => {
          this.loading = false;
          console.log("error");
        }
      );
  }

  delete(obj) {
    if (confirm("Are you sure to delete " + obj.Jobtitle)) {
      this.jobpostService.deletejob(obj).subscribe(obj => {
        console.log(obj);
        this.getdata();
      });
    }
  }
  cancel() {
    this.show = false;
  }
}
