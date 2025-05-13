import { Component } from '@angular/core';
import { UserApiService } from '../../api/user-api.service';
import { catchError, firstValueFrom, map, tap, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterModel } from '../../models/register.model';

@Component({
  selector: 'app-auth',
  imports: [
		CommonModule,
    ReactiveFormsModule,
	],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

	currentView: {login: boolean, register: boolean} = {
		login: true,
		register: false
	}

	passwordType: string = 'password'
  sourceImg: string = './../../../assets/img/eye.svg'

  LoginGroup: FormGroup<any>
  RegisterGroup: FormGroup<any>


	constructor(
		private usersApi: UserApiService,
    private fb: FormBuilder
	) {
    this.LoginGroup = this.fb.group({
      login: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(10)]],
      rememberMe: [false]
    })

    this.RegisterGroup = this.fb.group({
      login: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(10)]],
      rememberMe: [false],
      acceptRules: [false, Validators.required]
    })
  }


	getUsers(){
		firstValueFrom(this.usersApi.getUsers())
	}


  login(){

  }

  async register(){
    const body: RegisterModel = {
      login: this.RegisterGroup.value.login,
      password: this.RegisterGroup.value.password,
      rememberMe: this.RegisterGroup.value.rememberMe,
      acceptRules: this.RegisterGroup.value.acceptRules
    }

    await firstValueFrom(this.usersApi.createUser(body))

  }


	handlerPasswordType(){
		this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
    this.sourceImg = this.sourceImg == './../../../assets/img/eye.svg' ? './../../../assets/img/eye-slash-fill.svg' : './../../../assets/img/eye.svg';
	}
	switchView() {
		this.currentView.login = !this.currentView.login
		this.currentView.register = !this.currentView.register
	}
}
