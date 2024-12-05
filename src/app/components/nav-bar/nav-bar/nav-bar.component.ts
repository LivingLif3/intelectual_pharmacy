import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  readonly links = [
    {
      label: "Поиск лекарств",
      path: "catalogue"
    },
    {
      label: "Бот консультант",
      path: "chat"
    },
    // {
    //   label: "Услуги",
    //   path: ""
    // },
    // {
    //   label: "Врачи",
    //   path: ""
    // },
  ]
}
