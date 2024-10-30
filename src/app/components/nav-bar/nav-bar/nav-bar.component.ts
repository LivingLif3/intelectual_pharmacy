import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  readonly links = [
    {
      label: "Поиск лекарств",
      path: ""
    },
    {
      label: "Услуги",
      path: ""
    },
    {
      label: "Врачи",
      path: ""
    },
  ]
}
