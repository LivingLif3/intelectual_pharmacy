import { Component, inject, input, InputSignal, Signal } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CatalagService } from 'src/shared/catalag.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-catalogue-card',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './catalogue-card.component.html',
  styleUrl: './catalogue-card.component.scss'
})
export class CatalogueCardComponent {
  public readonly data = input<{
    id: number,
    url: string,
    slug: string,
    title: string,
    category: {
      title: string
    },
    brand: string,
    price: string,
    is_in_stock: boolean
  }>()
}
