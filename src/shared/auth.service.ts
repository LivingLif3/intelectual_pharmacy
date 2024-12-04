import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserRegister } from './types/user';
import { BASE_URL } from './constants/constants';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly storage = inject(StorageService)

  private readonly BASE_USERS_URL = `${BASE_URL}/users`

  private readonly http = inject(HttpClient)

  public auth(data: { email: string, password: string }) {
    return this.http.post(`${this.BASE_USERS_URL}/auth/jwt/create/`, data)
  }

  public refreshAuthToken(): Observable<any> {
    return this.http.post(`${this.BASE_USERS_URL}/auth/jwt/refresh/`, {
      refresh: this.storage.getRefreshToken()
    })
  }

  public register(data: IUserRegister) {
    const {email, firstName, lastName, password, phone} = data
    return this.http.post(`${this.BASE_USERS_URL}/new_customer/`, {
      user: {
        email,
        first_name: firstName,
        last_name: lastName,
        password
      },
      telephone_number: phone
    })
  }

  getUser() {
    return this.http.get(`${this.BASE_USERS_URL}/customer/${JSON.parse(window.localStorage.getItem('user')!).email.split('@')[0]}/`)
  }

  get authenticate() {
    return {
      Authorization: `Bearer ${this.storage.getAccessToken()}`
    }
  }
}
