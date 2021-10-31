import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  otp: string = '';
  showOTPFeild: boolean = false;
  SigninForm:FormGroup | any;
  formSubmitted: boolean = false;
  inValidOTP: boolean = false;
  inValidAadhar: boolean = false;

  constructor(public authService: AuthenticationService, public router: Router) { }

  ngOnInit(): void {
    this.SigninForm = new FormGroup({
      'uid': new FormControl('',[Validators.required, Validators.minLength(12), Validators.maxLength(12)])
    })
  }

  onOtpChange(otp: any): void {
    this.otp = otp;
  }

  onSubmit(): void{
    this.formSubmitted = true;
    if(this.SigninForm.valid) {
      this.authService.signIn(this.SigninForm.value).subscribe(
        res => {
          if (res == 'Otp Sent') {
            this.showOTPFeild = true;
            this.inValidAadhar = false;
          } else {
            this.inValidAadhar = true;
          }
        }
      )
    }
  }

  verifyOTP(): void {
    if (this.otp.length != 6) {
      this.inValidOTP = true
    } else {
      const details = {
        'uid': this.SigninForm.get('uid').value,
        'otp': this.otp
      };
      this.authService.verifyOTP(details).subscribe(res => {
        console.log(res);
        if (res == 'otp verified successfully') {
          localStorage.setItem('uid', JSON.stringify(this.SigninForm.get('uid').value));
          this.authService.isLoggedIn = true;
          this.router.navigate(['user/dashboard'])
          this.inValidOTP = false;
        } else {
          this.inValidOTP = true;
        }
      })
    }
  }
}
