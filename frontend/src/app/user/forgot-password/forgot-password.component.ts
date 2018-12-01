import { Component, OnInit } from '@angular/core';
import { ForgotpassService } from '../../service/forgotpass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  constructor(private forgotpassService: ForgotpassService,
    private router: Router) { }

  ngOnInit() {
  }


  submit() {
    this.forgotpassService.sendData({ email: this.email }).subscribe(data => {
      this.router.navigate(['/login']);
      alert(data.message)
    })

  }

}
