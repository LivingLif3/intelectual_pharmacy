import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../storage.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService)
  const authService = inject(AuthService)

  const accessToken = storage.getAccessToken()

  const clonedRequest = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
  })

  // if(clonedRequest.url.includes('refresh')) {
  //   return throwError(() => new Error('Unauthorized'))
  // }

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401) {
        return authService.refreshAuthToken().pipe(
          switchMap((newAccessToken: any) => {
            console.log(newAccessToken) // Важно!!! Дождаться когда умрёт токен и выяснить
            const newRequest = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${newAccessToken.access}`)
            })
            storage.setAccessToken(newAccessToken.access)
            // storage.setRefreshToken(newAccessToken.refresh)
            return next(newRequest)
          }),
          catchError(err => {
            //logout
            return throwError(() => new Error('Unauthorized'))
          })
        )
      }
      return throwError(() => error)
    })
  )
};
