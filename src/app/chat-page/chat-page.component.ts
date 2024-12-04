import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GeminiService } from 'src/shared/gemini.service';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [NgClass, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {
  private readonly gemini = inject(GeminiService)
  private readonly fb = inject(NonNullableFormBuilder)

  loading: boolean = false

  readonly form = this.fb.group({
    input: ''
  })

  readonly messages = signal<{my: boolean, text: string}[]>([])

  send() {
    const inputValue = this.form.get('input')?.value!
    this.form.setValue({
      input: ''
    })

    this.loading = true
    this.messages.update((messages) => [...messages, {
      my: true,
      text: inputValue
    }])
    console.log(this.messages())

    this.gemini.getAnswer(inputValue)
      .subscribe(response => response.then(({response}: any) => {
        const responseText = response.text()

        this.messages.update((messages) => [...messages, {
          my: false,
          text: responseText
        }])

        this.loading = false
      }))
  }
}
