import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CatalagService } from 'src/shared/catalag.service';
import { CatalogueCardComponent } from './components/catalogue-card/catalogue-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalogue-page',
  standalone: true,
  imports: [MatPaginatorModule, CatalogueCardComponent, RouterLink],
  templateUrl: './catalogue-page.component.html',
  styleUrl: './catalogue-page.component.scss'
})
export class CataloguePageComponent {

  readonly MOCKED_CATALOG_INFO = signal({
    count: 32,
    next: 'http://localhost:safsafa',
    previous: 'http://localhost:safsafa',
    results: [
      {
        id: 0,
        url: 'http://localhost:8000',
        slug: 'dsadasda',
        title: "Парацетамол",
        category: {
          title: 'Medical products'
        },
        brand: 'Белфармация',
        price: '15 р.',
        is_in_stock: true
      },
      {
        id: 1,
        url: 'http://localhost:8000',
        slug: 'dsadasda',
        title: "Фурацилин",
        category: {
          title: 'Medical products'
        },
        brand: 'Белфармация',
        price: '25 р.',
        is_in_stock: true
      },
      {
        id: 1,
        url: 'http://localhost:8000',
        slug: 'dsadasda',
        title: "Фурацилин",
        category: {
          title: 'Medical products'
        },
        brand: 'Белфармация',
        price: '25 р.',
        is_in_stock: true
      },
      {
        id: 1,
        url: 'http://localhost:8000',
        slug: 'dsadasda',
        title: "Фурацилин",
        category: {
          title: 'Medical products'
        },
        brand: 'Белфармация',
        price: '25 р.',
        is_in_stock: true
      },
      {
        id: 1,
        url: 'http://localhost:8000',
        slug: 'dsadasda',
        title: "Фурацилин",
        category: {
          title: 'Medical products'
        },
        brand: 'Белфармация',
        price: '25 р.',
        is_in_stock: true
      },{
        id: 1,
        url: 'http://localhost:8000',
        slug: 'dsadasda',
        title: "Фурацилин",
        category: {
          title: 'Medical products'
        },
        brand: 'Белфармация',
        price: '25 р.',
        is_in_stock: true
      }
    ]
  })

  private readonly catalogService = inject(CatalagService)

  private readonly currentPage = new BehaviorSubject(0)

  public catalogues = toSignal<any>(
    this.currentPage.pipe(
      switchMap((page: number) => this.catalogService.getCatalogs(page))
    )
  )

  constructor() {
    effect(() => console.log(this.catalogues()))
  }

  public handlePageEvent(e: PageEvent) {
    this.currentPage.next(e.pageIndex)
  }
}
