import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {BASE_URL} from './constants/constants';
import {AuthService} from './auth.service';
import {ɵElement, ɵFormGroupRawValue, ɵGetProperty, ɵTypedOrUntyped} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatalagService {
  private readonly http = inject(HttpClient)
  private readonly auth = inject(AuthService)

  public readonly products = new BehaviorSubject<any>([])

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
    return this.http.get(`${this.CATALOG_BASE_URL}/${id}`, {
      headers: this.auth.authenticate
    })
  }

  getComments(id: string) {
    return this.http.get(`${this.CATALOG_BASE_URL}/comment/${id}`, {
      headers: this.auth.authenticate
    })
  }

  createComment(product_id: string, comment: string | null | undefined) {
    return this.http.post(`${this.CATALOG_BASE_URL}/comment/${product_id}`, {
      comment_field: comment
    }, {
      headers: this.auth.authenticate
    })
  }

  searchProductByDescription(description: string | undefined) {
    return this.http.post(`${this.CATALOG_BASE_URL}/search_product_by_description/`, {
      description
    }, {
      headers: this.auth.authenticate
    })
  }
}
