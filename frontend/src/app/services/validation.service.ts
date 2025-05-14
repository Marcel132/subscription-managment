import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateEmail(email: string): {state: boolean | null, message: string | null} {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return {state: false, message: `Błędny adres email: ${email}`}
    } else {
      return {state: true, message: null}
    }
	}

  validatePassword(password: string): {state: boolean | null, message: string | null} {
    if(password == null){
      return {state: false, message: `Musisz ustawić hasło`}
    } else if(password.length < 10) {
      return {state: false, message: `Hasło musi mieć min. 10 znaków`}
    } else if(password.length > 70) {
      return {state: false, message: `Hasło nie może być dłuższe niż 70 znaków`}
    } else if (!/[A-Z]/.test(password)){
      return {state: false, message: `Hasło musi mieć co najmniej jedną wielką literę`}
    } else if (!/[a-z]/.test(password)){
      return {state: false, message: `Hasło musi mieć co najmniej jedną małą literę`}
    } else if (!/[0-9]/.test(password)){
      return {state: false, message: `Hasło musi zawierać jedną cyfrę`}
    } else if (!/[@$!%*?&-_]/.test(password)){
      return {state: false, message: `Hasło musi zawierać jeden znak specjalny: @ $ ! % * ? &`}
    } else {
      return {state: true, message: null}
    }
  }

  validateCheckbox(value: boolean): {state: boolean | null, message: string | null} {
    console.log(value)
    return !value ? {state: false, message: `Nie zaakceptowano warunków`} : {state: true, message: null}
  }
}
