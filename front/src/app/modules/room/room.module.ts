import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { roomRoutes } from 'src/app/modules/room/room-routing.module';
import { CreateRoomComponent } from "src/app/modules/room/components/create-room/create-room.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from "@angular/common";
import { RoomGameComponent } from "src/app/modules/room/components/room-game/room-game.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(roomRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  declarations: [
    CreateRoomComponent,
    RoomGameComponent
  ],
  providers: [
    
  ],
})
export class RoomModule {}
