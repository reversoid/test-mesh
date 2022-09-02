import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductComponent } from './components/product/product.component';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from './shared/NgRx/product.reducer';
import { ProductEffects } from './shared/NgRx/product.effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackendInterceptor } from './MockApi/server';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ProductsPageComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    StoreModule.forRoot({ product: productReducer }),
    ReactiveFormsModule,
    EffectsModule.forRoot([ProductEffects]),
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
