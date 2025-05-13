import { Component } from '@angular/core';
import { UserApiService } from '../../api/user-api.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [
		CommonModule,
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

	constructor(
		private usersApi: UserApiService
	) {}


	getUsers(){
		firstValueFrom(this.usersApi.getUsers())
	}


	handlerPasswordType(){
		this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
    this.sourceImg = this.sourceImg == './../../../assets/img/eye.svg' ? './../../../assets/img/eye.svg' : './../../../assets/img/eye-slash-fill.svg';
	}
	switchView() {
		this.currentView.login = !this.currentView.login
		this.currentView.register = !this.currentView.register
	}
}
