import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from '../../service/signin.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userObj: User;
  arrUser: User[];

  show: boolean = false;

  updateForm: FormGroup;
  loading = false;
  submitted = false;
  imageData = "";
  imageData1 = "";
  constructor(private formBuilder: FormBuilder, private signinService: SigninService,
    private router: Router) {
    this.userObj = new User();
    this.arrUser = [];
  }
  onfileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.updateForm.get('avtar').setValue({
          filename: file.name,
          filetype: file.type,
          blobdata: reader.result.split(',')[1]
        });

        this.imageData = 'data:' + this.updateForm.get('avtar').value.filetype + ';base64,' + this.updateForm.get('avtar').value.blobdata;


      }
    }

  }
  addEducation() {
    if (localStorage.getItem('username') != null) {
      this.router.navigate(['user/addeducation/' + localStorage.getItem('username')]);
    }
    return false;
  }

  ngOnInit() {
    this.getprofile();
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      avtar: null,
      filename: [''],
      _id: [''],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]],
      mobile: ['', Validators.required],

    });
  }

  get f() { return this.updateForm.controls; }

  edit(obj) {
    this.show = true;
    this.updateForm.patchValue(obj);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }
    this.loading = true;
    this.signinService.updatedata(this.updateForm.value).pipe(first()).subscribe(data => {
      console.log(data);
      this.getprofile();
      this.show = false;
      this.submitted = false;
      this.loading = false;
      //
    },
      error => {
        this.loading = false;
        console.log("error");

      });




  }

  getprofile() {
    this.signinService.getprofile().subscribe(data => {
      console.log("data");
      // console.log(data);
      this.arrUser = [data];
      console.log(this.arrUser);



    })
  }

  delete(obj) {
    if (confirm("Are you sure to delete " + obj.username)) {
      this.signinService.deletedata(obj).subscribe(obj => obj);
      this.signinService.logout();
      this.router.navigate(['/signin']);
    }
  }

  cancel() {
    this.show = false
  }
}
