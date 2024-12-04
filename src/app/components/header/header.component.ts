import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatInputModule, MatFormFieldModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private readonly router = inject(Router)

  protected readonly showInput = signal<boolean>(false)

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((navigation: any) => {
        if(!navigation.url.includes('main')) this.showInput.set(true)
      })

      this.startSpeechRecognition()
  }

  startSpeechRecognition() {
    if('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      // @ts-ignore
      const SpeechRecognition: any = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      console.log(recognition)
    }
    
  }
}
