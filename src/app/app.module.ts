import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './page/auth/login/login.component';
import { RegistrationComponent } from './page/auth/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AdminComponent } from './page/admin/admin.component';
import { AddProductComponent } from './shared/components/add-product/add-product.component';
import { ProductRoutingModule } from './page/products/products.routing.module';
import { SharedModule } from './shared/shared.module';
import { ProductCartComponent } from './page/product-cart/product-cart.component';
import { RequestInterceptorInterceptor } from './shared/interceptor/request-interceptor.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    PageNotFoundComponent,
    DashboardComponent,
    AdminComponent,
    AddProductComponent,
    ProductCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
