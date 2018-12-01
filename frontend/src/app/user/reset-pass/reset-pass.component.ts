import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordValidation } from '../../commons/validators/customvalidators';
import { first } from 'rxjs/operators';
import { ForgotpassService } from '../../service/forgotpass.service';
import { SigninService } from '../../service/signin.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  public token: string;
  constructor(

    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private forgotpassService: ForgotpassService,
    private signinService: SigninService,
  ) {
    this.route.params.subscribe(params => {
      this.token = params["token"];
    });

  }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required, Validators.minLength(6)]],
      token: ''
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.resetForm.value.token = this.token;
    console.log(this.resetForm.value.token);

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    this.forgotpassService.resetData(this.resetForm.value).pipe(first()).subscribe(data => {
      console.log(data);
      this.signinService.logout();
      this.router.navigate(['/login']);
    },
      error => {
        console.log(error);

      });




  }

}
