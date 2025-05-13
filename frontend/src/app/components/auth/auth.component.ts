import { Component } from '@angular/core';
import { UserApiService } from '../../api/user-api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

	constructor(
		private usersApi: UserApiService
	) {}


	getUsers(){
		firstValueFrom(this.usersApi.getUsers())
	}
}
