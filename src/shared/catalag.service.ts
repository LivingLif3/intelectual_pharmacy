import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from './constants/constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CatalagService {
  private readonly http = inject(HttpClient)
  private readonly auth = inject(AuthService)

  readonly CATALOG_BASE_URL = `${BASE_URL}/catalog`

  getCatalogs(page: number) {
    return this.http.get(`${this.CATALOG_BASE_URL}/`, {
      ...this.auth.authenticate,
      params: {
        page
      }
    })
  }

  getCatalogue(id: string) {
    return this.http.get(`${this.CATALOG_BASE_URL}/${id}/`, {
      headers: this.auth.authenticate
    })
  }

  getComments(id: string) {
    return this.http.get(`${this.CATALOG_BASE_URL}/comment/${id}`, {
      headers: this.auth.authenticate
    })
  }
}
