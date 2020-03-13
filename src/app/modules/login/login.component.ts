import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, 
              private formBuilder: FormBuilder,
              private authService: AuthService) { }

  loginForm: FormGroup;
  isSubmitted  =  false;

  ngOnInit() {

    let token = localStorage.getItem('ACCESS_TOKEN');

    if (token) {
      this.router.navigateByUrl('/dashboard');
    }
    
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get formControls() { return this.loginForm.controls; }

  login(){
    
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value)
    .subscribe((res:any)=> {
      if(res['data'].token){
        localStorage.setItem("ACCESS_TOKEN",res['data'].token);
        this.router.navigateByUrl('/dashboard');
      } else {
        // Login error msg
      }

    })
  }

}
