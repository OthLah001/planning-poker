import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { userRoutes } from 'src/app/modules/user/user-routing.module';
import { SignupComponent } from 'src/app/modules/user/components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { SettingsComponent } from "src/app/modules/user/components/settings/settings.component";
import { PersonalInfoComponent } from "src/app/modules/user/components/personal-info/personal-info.component";
import { IonicModule } from "@ionic/angular";
import { EditPasswordComponent } from "src/app/modules/user/components/edit-password/edit-password.component";
import { PaymentInfoComponent } from "src/app/modules/user/components/payment-info/payment-info.component";
import { VerifyEmailComponent } from 'src/app/modules/user/components/verify-email/verify-email.component';
import { LogoutComponent } from "src/app/modules/user/components/logout/logout.component";
import { ResetPasswordComponent } from "src/app/modules/user/components/reset-password/reset-password.component";
import { EmailLinkComponent } from "src/app/modules/user/components/email-link/email-link.component";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(userRoutes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    SignupComponent,
    SettingsComponent,
    PersonalInfoComponent,
    EditPasswordComponent,
    PaymentInfoComponent,
    VerifyEmailComponent,
    LogoutComponent,
    ResetPasswordComponent,
    EmailLinkComponent
  ],
  providers: [
    
  ],
})
export class UserModule {}
