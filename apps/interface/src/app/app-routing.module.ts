import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomPreloadingStrategy } from 'src/app/app-preload-strategy';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('src/app/user/user.module').then(m => m.UserModule),
    data: { preload: true }
  },
  {
    path: 'room',
    loadChildren: () => import('src/app/room/room.module').then(m => m.RoomModule),
    data: { preload: false }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: CustomPreloadingStrategy,
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
