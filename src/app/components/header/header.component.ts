import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { filter } from 'rxjs';
import {MatButton} from "@angular/material/button";
import {CatalagService} from "../../../shared/catalag.service";
import {NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [RouterLink, MatInputModule, MatFormFieldModule, MatButton, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private readonly router = inject(Router)
  private readonly catalogService = inject(CatalagService)
  private readonly fb = inject(NonNullableFormBuilder)

  protected readonly showInput = signal<boolean>(false)

  protected readonly searchControl = this.fb.control('')

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((navigation: any) => {
        if(!navigation.url.includes('catalogue')) {
          this.showInput.set(true)
        } else {
          this.showInput.set(false)
        }
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

  onSearchByDescription() {
    if(!this.searchControl.value) {
      this.catalogService.getCatalogs(0).subscribe((catalogs) => this.catalogService.products.next(catalogs))
    } else {
      this.catalogService.searchProductByDescription(this.searchControl.value).subscribe((products: any) => {
        if(!products) this.catalogService.products.next(products)

        this.catalogService.products.next(products)
      })
    }
  }
}
