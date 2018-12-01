import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SigninService } from '../../service/signin.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  inputForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private signinService: SigninService) { }

  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  get f() { return this.inputForm.controls; }

  onSubmit() {
    console.log("submit");

    // stop here if form is invalid
    if (this.inputForm.invalid) {
      return;
    }
    this.submitted = true;
    let data = { username: this.f.username.value, password: this.f.password.value }
    this.signinService.signin(data)
      .pipe(first())
      .subscribe(
        data => {
          console.log("login done");
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.log(error);

        });
  }
}
