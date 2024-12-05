import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CatalagService } from 'src/shared/catalag.service';
import { CatalogueCardComponent } from './components/catalogue-card/catalogue-card.component';
import { RouterLink } from '@angular/router';
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-catalogue-page',
  standalone: true,
  imports: [MatPaginatorModule, CatalogueCardComponent, RouterLink, AsyncPipe],
  templateUrl: './catalogue-page.component.html',
  styleUrl: './catalogue-page.component.scss'
})
export class CataloguePageComponent {

  public readonly catalogService = inject(CatalagService)

  private readonly currentPage = new BehaviorSubject(0)

  // public catalogues = toSignal<any>(
  //   this.currentPage.pipe(
  //     switchMap((page: number) => this.catalogService.getCatalogs(page))
  //   )
  // )

  constructor() {
    this.catalogService.getCatalogs(0).subscribe((catalogs) => this.catalogService.products.next(catalogs))
  }

  public handlePageEvent(e: PageEvent) {
    this.currentPage.next(e.pageIndex)
  }
}
