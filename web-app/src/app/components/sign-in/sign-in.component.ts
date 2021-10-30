import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormArray} from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
    this.SigninForm = new FormGroup({
      'aadhar': new FormControl('',[Validators.required, Validators.minLength(16), Validators.maxLength(16)])
    })
  }

  onOtpChange(otp: any): void {
    this.otp = otp;
  }

  onSubmit(): void{
    this.formSubmitted = true;
    if(this.SigninForm.valid) {
      this.showOTPFeild = true;
    }
    console.log(this.SigninForm);
  }

  verifyOTP(): void {
    console.log(this.otp)
    if (this.otp.length != 6) {
      this.inValidOTP = true
    } else {
      this.inValidOTP = false
    }
  }
}
