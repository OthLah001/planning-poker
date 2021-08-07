import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { roomRoutes } from 'src/app/modules/room/room-routing.module';
import { CreateRoomComponent } from "src/app/modules/room/components/create-room/create-room.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from "@angular/common";
import { RoomGameComponent } from "src/app/modules/room/components/room-game/room-game.component";
import { MatDialogModule } from '@angular/material/dialog'; 
import { NewParticipantDialogComponent } from "src/app/modules/room/components/dialogs/new-participant-dialog/new-participant-dialog.component";
import { RoomHeaderComponent } from "src/app/modules/room/components/room-header/room-header.component";
import { IonicModule } from "@ionic/angular";
import { InvitePeopleDialogComponent } from "src/app/modules/room/components/dialogs/invite-people-dialog/invite-people-dialog.component";
import { LeaveRoomDialogComponent } from "src/app/modules/room/components/dialogs/leave-room-dialog/leave-room-dialog.component";
import { RoomCardsComponent } from "src/app/modules/room/components/room-cards/room-cards.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(roomRoutes),
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule
  ],
  declarations: [
    CreateRoomComponent,
    RoomGameComponent,
    NewParticipantDialogComponent,
    RoomHeaderComponent,
    InvitePeopleDialogComponent,
    LeaveRoomDialogComponent,
    RoomCardsComponent
  ],
  providers: [
  ],
})
export class RoomModule {}
