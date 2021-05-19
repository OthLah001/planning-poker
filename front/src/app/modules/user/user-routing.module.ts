import { Routes } from "@angular/router";
import { SignupComponent } from "src/app/modules/user/components/signup/signup.component";
import { SettingsComponent } from "src/app/modules/user/components/settings/settings.component";
import { PersonalInfoComponent } from "src/app/modules/user/components/personal-info/personal-info.component";
import { EditPasswordComponent } from "src/app/modules/user/components/edit-password/edit-password.component";
import { PaymentInfoComponent } from "src/app/modules/user/components/payment-info/payment-info.component";
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent
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
  }
];
