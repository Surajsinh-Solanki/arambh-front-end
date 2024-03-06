import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule } from '@angular/forms';
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
// import { PaymentComponent } from './components/payment/payment.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavigationComponent,
    LogoutDialogComponent,
    PaginationComponent,
  ],
  imports: [SharedRoutingModule, FormsModule, CommonModule],
  exports: [FooterComponent, NavigationComponent, PaginationComponent],
})
export class SharedModule {}
