import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import * as $ from "jquery";
import { ApplyforjobService } from "../../service/applyforjob.service";
import { JobPostService } from "../../service/job-post.service";

@Component({
  selector: "app-applyforjob",
  templateUrl: "./applyforjob.component.html",
  styleUrls: ["./applyforjob.component.css"]
})
export class ApplyforjobComponent implements OnInit {
  inputForm: FormGroup;
  submitted = false;
  filename: string;
  imageData: string;
  items: FormArray;
  docs = [];
  id: number = 0;
  public job_id: string;
  public Jobtitle: string;
  public Jobtype: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private applyforjobService: ApplyforjobService,
    private route: ActivatedRoute,
    private jobPostService: JobPostService
  ) {

    this.route.params.subscribe(params => {
      this.job_id = params["id"];
    });
    this.getdetail();
    this.getData();
  }

  getdetail() {

    this.jobPostService.getdetail(this.job_id).subscribe(data => {
      console.log(data[0].Jobtitle);
      this.Jobtitle = data[0].Jobtitle
      this.Jobtype = data[0].Jobtype
    })


  }

  getData() {
    this.applyforjobService.getRecordLength().subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {
    //@form group
    this.inputForm = this.formBuilder.group({
      username: "",
      description: ["", Validators.required],
      jobtype: [""],
      price: ["", Validators.required],
      items: this.formBuilder.array([this.createItem()])
      //docs: this.items
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: "",
      filename: "",
      avtar: ""
    });
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
        //console.log($('#name' + i).val())
        this.docs.push({ name: $("#name" + i).val(), avtar: obj });
        // this.imageData = 'data:' + this.inputForm.controls.items.get('avtar').value.filetype + ';base64,' + this.inputForm.controls.items.get('avtar').value.blobdata;
      };
    }
  }

  addItem(): void {
    this.items = this.inputForm.get("items") as FormArray;
    this.items.push(this.createItem());
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.inputForm.controls;
  }

  onSubmit() {
    // for (let i = 0; i < this.docs.length; i++) {
    //   this.docs[i].name = this.inputForm.value.items[i].name
    // }
    this.inputForm.value.items = this.docs;
    this.inputForm.value.job_name = this.Jobtitle;
    this.inputForm.value.jobtype = this.Jobtype;
    this.submitted = true;
    // stop here if form is invalid
    if (this.inputForm.invalid) {
      return;
    }
    this.applyforjobService
      .savedata(this.job_id, this.inputForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.router.navigateByUrl('/dashboard');
          alert("Well done! You successfully applied.")
        },
        error => {
          console.log(error);
        }
      );
  }
}
