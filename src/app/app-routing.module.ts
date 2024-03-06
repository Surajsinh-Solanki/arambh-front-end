import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/auth/login/login.component';
import { RegistrationComponent } from './page/auth/registration/registration.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AdminComponent } from './page/admin/admin.component';
import { ProductCartComponent } from './page/product-cart/product-cart.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { OrderComponent } from './page/order/order.component';
import { ProfileComponent } from './page/auth/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./page/products/products.module').then((m) => m.ProductModule),
  },
  {
    path: 'cart',
    component: ProductCartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
