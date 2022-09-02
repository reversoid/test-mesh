import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectIsLoading } from './shared/NgRx/product.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  public isLoading?: boolean = true;

  private _ngDestroy$ = new Subject<boolean>();

  ngOnInit() {
    setTimeout(() => {
      this.store
        .select(selectIsLoading)
        .pipe(takeUntil(this._ngDestroy$))
        .subscribe((value) => (this.isLoading = value));
    });
  }

  ngOnDestroy(): void {
    this._ngDestroy$.next(true);
    this._ngDestroy$.complete();
  }
}
