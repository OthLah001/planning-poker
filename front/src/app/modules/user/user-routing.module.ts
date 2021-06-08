import { Routes } from "@angular/router";
import { SignupComponent } from "src/app/modules/user/components/signup/signup.component";
import { SettingsComponent } from "src/app/modules/user/components/settings/settings.component";
import { PersonalInfoComponent } from "src/app/modules/user/components/personal-info/personal-info.component";
import { EditPasswordComponent } from "src/app/modules/user/components/edit-password/edit-password.component";
import { PaymentInfoComponent } from "src/app/modules/user/components/payment-info/payment-info.component";
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { VerifyEmailComponent } from 'src/app/modules/user/components/verify-email/verify-email.component';
import { LogoutComponent } from "src/app/modules/user/components/logout/logout.component";
import { ResetPasswordComponent } from "src/app/modules/user/components/reset-password/reset-password.component";
import { EmailLinkComponent } from "src/app/modules/user/components/email-link/email-link.component";


export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [
      AngularFireAuthGuard
    ],
    data: {
      authGuardPipe: () => redirectLoggedInTo(['/user/settings']) // TO-DO: change it
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [
      AngularFireAuthGuard
    ],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['/user/login'])
    },
    children: [
      {
        path: '',
        redirectTo: 'personal-info',
        pathMatch: 'full'
      },
      {
        path: 'personal-info',
        component: PersonalInfoComponent
      },
      {
        path: 'edit-password',
        component: EditPasswordComponent
      },
      {
        path: 'payment-info',
        component: PaymentInfoComponent
      }
    ]
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'email-link',
    component: EmailLinkComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
];
