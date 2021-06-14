import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { Routes } from "@angular/router";
import { CreateRoomComponent } from "src/app/modules/room/components/create-room/create-room.component";
import { RoomGameComponent } from "src/app/modules/room/components/room-game/room-game.component";


export const roomRoutes: Routes = [
  {
    path: 'new',
    component: CreateRoomComponent,
    canActivate: [
      AngularFireAuthGuard
    ],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['/user/login'])
    }
  },
  {
    path: ':id',
    component: RoomGameComponent
  }
];
