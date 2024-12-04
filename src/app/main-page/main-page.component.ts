import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from 'src/shared/gemini.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  private readonly gemini = inject(GeminiService)

  ngOnInit(): void {
    // this.gemini.getAnswer('Write a story about a magic backpack.').subscribe(response => response.then(({response}: any) => console.log(response.text())))
  }

}
