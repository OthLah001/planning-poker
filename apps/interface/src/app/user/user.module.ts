import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { userRoutes } from 'src/app/user/user-routing.module';

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes),
  ],
  declarations: [

  ],
  providers: [
    
  ],
})
export class UserModule {}
