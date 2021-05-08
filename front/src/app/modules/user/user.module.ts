import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { userRoutes } from 'src/app/modules/user/user-routing.module';
import { SignupComponent } from 'src/app/modules/user/components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes),
    ReactiveFormsModule,
  ],
  declarations: [
    SignupComponent
  ],
  providers: [
    
  ],
})
export class UserModule {}
