import { Routes } from "@angular/router";
import { SignupComponent } from "src/app/modules/user/components/signup/signup.component";


export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];
