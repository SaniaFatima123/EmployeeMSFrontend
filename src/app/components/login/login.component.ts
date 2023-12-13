import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router){}

  loginData={
    username:'',
    password:''
  };
  formSubmit(){
    console.log(this.loginData)
  //request to server to generate token
this.loginService.generateToken(this.loginData).subscribe((data:any)=>{
  console.log("success");
  console.log(data);
  //login...
  // this.loginService.loginUser(data.token);

  this.loginService.getCurrentUser().subscribe((user:any) => {
    this.loginService.setUser(user);
    console.log(user);
    //redirect...ADMIN: admin-dashboard
    //redirect...NORMAL: normal-dashboard
    if(this.loginService.getUserRole()=="ADMIN"){
      console.log("admin line 35")
      //admin dashboard
      // window.location.href='/admin';
      this.router.navigate(['dashboard'])
      this.loginService.loginStatusSubject.next(true)
    }
    else if(this.loginService.getUserRole()=="NORMAL"){
      console.log("NORMAL role");
      //normal user-dashboard
      // window.location.href='/user-dashboard';
      this.router.navigate(['user-dashboard/user-profile'])
      this.loginService.loginStatusSubject.next(true)
    }
    else{
      console.log("LOGGING out");
      
      this.loginService.logout();
    }   
  });
},
  (error) => {
    console.log("Something went wrong");
    console.log(error);
    // this.snack.open("Invalid Details !! Try again !!","", {duration: 3000})
  });
    
}
 
  
  
}
