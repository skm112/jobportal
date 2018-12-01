import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../service/signup.service';
import { PasswordValidation } from '../../commons/validators/customvalidators';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private signupService: SignupService,
  ) { }

  onfileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.registerForm.get('avtar').setValue({
          filename: file.name,
          filetype: file.type,
          blobdata: reader.result.split(',')[1]
        });
      }
    }

  }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      avtar: null,
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      filename: [''],
      selectedItems: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")]],
      mobile: ['', Validators.required],
    },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    // console.log(this.registerForm.value);
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.signupService.signup(this.registerForm.value).pipe(first()).subscribe(data => {
      console.log(data);

      this.router.navigate(['/login']);
    },
      error => {
        console.log("error");

      });




  }

}
