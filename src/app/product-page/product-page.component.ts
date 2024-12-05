import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { CommentComponent } from './components/comment/comment.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { CatalagService } from 'src/shared/catalag.service';
import {catchError, map, of, switchMap} from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from 'src/shared/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [DatePipe, MatIconModule, CommentComponent, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly catalogService = inject(CatalagService)
  private readonly fb = inject(NonNullableFormBuilder)
  private readonly authService = inject(AuthService)
  private snackBar = inject(MatSnackBar)

  public readonly product = signal<any>({
    title: 'new prod',
    price: '100',
    brand: 'brand',
    expiration_date: new Date(),
    addition_date: new Date(),
    is_in_stock: true,
    average_rating: 4,
    barcode: 1234,
    amount: 2,
    info: "info"
  })

  public readonly comments = signal<any>([
    {
      customer_email: "alexletko@gmail.com",
      comment_field: "Топ, всем советую, в вену с первого раза попал",
      changed_at: new Date(),
      id: 1
    },
    {
      customer_email: "alexletko@gmail.com",
      comment_field: "Топ, всем советую, в вену с первого раза попал",
      changed_at: new Date(),
      id: 2
    }
  ])

  readonly form = this.fb.group({
    comment: ['']
  })

  readonly idParam = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['id'])
    )
  );

  ngOnInit() {
    const id: any = this.idParam()

    this.catalogService.getCatalogue(id).subscribe(catalogue => {
      console.log(catalogue)
      this.product.set(catalogue)
    })

    this.catalogService.getComments(id).subscribe(comments => this.comments.set(comments))
  }

  createComment() {
    const id = this.idParam()

    if(!id) return

    if(!this.form.get('comment')?.value) return

    this.catalogService.createComment(id, this.form.get('comment')?.value)
      .pipe(
        catchError(() => {
          this.openSnackBar('В комментарии присутствует нецензурная лексика')
          return of(null)
        }),
        switchMap(() => this.catalogService.getComments(id))
      ).subscribe((comments) => {
      this.comments.set(comments)
      this.form.get('comment')?.reset()
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss');
  }
}
