import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConfig } from './config/api.routes.config';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

	apiConfig = apiConfig
  constructor(
		private http: HttpClient,
	) {	}

	// CRUD function

	createUser(body: {}) {
		return this.handlerRequest(this.http.post(apiConfig.user, body))
	};

	getUser() {
		return this.handlerRequest(this.http.get(apiConfig.user))
	};

	deleteUser(userId: string) {
		return this.handlerRequest(this.http.delete(`${apiConfig.user}/${userId}`))
	}

	updateUser(userId: string, body: {}) {
		return this.handlerRequest(this.http.put(`${apiConfig.user}/${userId}`, body))
	}

	private handlerRequest<T>(observable: Observable<T>): Observable<T>{
		return observable.pipe(
			tap(() => {
				console.log("Request send")
			}),
			map(response => {
				console.info("Response recived", response)
				return response
			}),
			catchError(error => {
				console.error("Error occurred:", error)
				return throwError(() => error)
			})
		)
	}

}
