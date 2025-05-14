import { Component } from '@angular/core';
import { UserApiService } from '../../api/user-api.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterModel } from '../../models/register.model';
import { ResponseHandler } from '../../models/response-handler.model';
import { ValidationService } from '../../services/validation.service';

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

  responseHandler: ResponseHandler = {
    responseState: false,
    responseMessage: null,
    errorState: false,
    errorMessage: null,
    isLoading: false,
    isLoadingMessage: null
  }


	constructor(
		private usersApi: UserApiService,
    private fb: FormBuilder,
    private validationService: ValidationService,
	) {
    this.LoginGroup = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(10)]],
      rememberMe: [false]
    })

    this.RegisterGroup = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
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
    this.responseHandler = { responseState: false, responseMessage: null, errorState: false, errorMessage: null, isLoading: false, isLoadingMessage: null }
    const body: RegisterModel = this.RegisterGroup.value

    const validEmail = this.validationService.validateEmail(body.login)
    const validPassword = this.validationService.validatePassword(body.password)
    const validCheckbox = this.validationService.validateCheckbox(body.acceptRules)

    if(!validEmail.state){
      this.responseHandler.errorState = true; this.responseHandler.errorMessage = validEmail.message
      return
    }

    if(!validPassword.state){
      this.responseHandler.errorState = true; this.responseHandler.errorMessage = validPassword.message;
      return
    }

    if(!validCheckbox.state){
      this.responseHandler.errorState = true; this.responseHandler.errorMessage = validCheckbox.message;
      return
    }

    try {
      this.responseHandler.isLoading = true;
      this.responseHandler.isLoadingMessage = `[Rejestracja...]`

      const response = await firstValueFrom(this.usersApi.createUser(body).pipe())

      setTimeout(()=> {
        this.responseHandler = { responseState: true, responseMessage: `Zarejestrowano użytkownika o emailu: ${body.login}`, errorState: false, errorMessage: null, isLoading: false, isLoadingMessage: null }
      }, 1500 )

    }
    catch(error){

    }
    finally {
    }
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
