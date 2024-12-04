import { Component, computed, inject, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from 'src/shared/auth.service';
import {MatButtonModule} from '@angular/material/button';
import { StorageService } from 'src/shared/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, NgIf, MatButtonModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {

  private readonly authService = inject(AuthService)
  private readonly storageService = inject(StorageService)
  private readonly fb = inject(NonNullableFormBuilder)
  private readonly router = inject(Router)

  public authLabel = computed(() => this.signMode() ? "Авторизация" : "Регистрация")
  public signInLabel = computed(() => this.signMode() ? "" : "Регистрация")

  public signMode = signal(true)

  public readonly form = this.fb.group({
    email: '',
    password: ''
  })

  public switchSignMode() {
    this.signMode.update(value => !value)
  }

  public auth() {
    this.authService.auth({
      email: this.form.get('email')?.value ?? '',
      password: this.form.get('password')?.value ?? ''
    }).subscribe((tokens: any) => {
      const { access, refresh } = tokens
      this.storageService.setAccessToken(access)
      this.storageService.setRefreshToken(refresh)
      window.localStorage.setItem('user', JSON.stringify({
        email: this.form.get('email')?.value
      }))
      this.router.navigate(['/main'])
    })
  }

  public register() {
    this.authService.register({
      email: 'test@mail.ru',
      firstName: 'sasha',
      lastName: 'letko',
      password: 'test1475369',
      phone: '+375447579370'
    }).subscribe(console.log)
  }
}
