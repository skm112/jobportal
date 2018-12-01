import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { SigninService } from '../../service/signin.service';
import { PasswordValidation } from '../../commons/validators/customvalidators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private signinService: SigninService,
  ) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      oldpass: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required, Validators.minLength(6)]],
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    this.loading = true;
    this.signinService.resetPass(this.resetForm.value).pipe(first()).subscribe(data => {
      console.log(data);
      this.signinService.logout();
      this.router.navigate(['/login']);
    },
      error => {
        console.log(error);

        this.loading = false;
      });




  }

}
