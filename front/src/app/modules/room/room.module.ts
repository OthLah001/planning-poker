import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { roomRoutes } from 'src/app/modules/room/room-routing.module';

@NgModule({
  imports: [
    RouterModule.forChild(roomRoutes),
  ],
  declarations: [

  ],
  providers: [
    
  ],
})
export class RoomModule {}
