import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../Services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public hide: boolean = true;
  public isLoading = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.isLoading = localStorage.getItem('token') != null;
    console.log(this.isLoading);
    if(this.isLoading){
      this.userService.initRoutes(JSON.parse(localStorage.getItem("token"))['role'])
       this.router.navigate(['/dashboard'])
    } else{
      this.isLoading=false;
    }
    if (this.userService.currentUser.value != null) {
      this.userService.initRoutes(this.userService.currentUser.value.role)
      this.router.navigate(['/dashboard']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  getEmailErrorMessages() {
    if (this.f.email.hasError('required')) {
      return 'Vous devez saisir une valeur';
    }

    return this.f.email.hasError('email') ? 'Adresse non valide' : '';
  }

  getPasswordErrorMessages() {
    if (this.f.password.hasError('required')) {
      return 'Vous devez saisir une valeur';
    }

    return this.f.password.hasError('minlength') ? 'Le mot de passe doit comporter au moins 8 caractères' : '';
  }

  login(value) {
    console.log(value['email']);
    this.userService.login(value['email'], value['password']);
  }
}
