import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule } from '@angular/forms';
// import { PaymentComponent } from './components/payment/payment.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavigationComponent,
    // PaymentComponent
  ],
  imports: [SharedRoutingModule, FormsModule],
  exports: [FooterComponent, NavigationComponent],
})
export class SharedModule {}
