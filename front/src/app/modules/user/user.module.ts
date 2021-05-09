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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    SignupComponent
  ],
  providers: [
    
  ],
})
export class UserModule {}
