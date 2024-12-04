import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getAccessToken() {
    return window.localStorage.getItem('accessToken')
  }

  setAccessToken(token: string) {
    window.localStorage.setItem('accessToken', token)
  }

  getRefreshToken() {
    return window.localStorage.getItem('refreshToken')
  }

  setRefreshToken(token: string) {
    window.localStorage.setItem('refreshToken', token)
  }
}
