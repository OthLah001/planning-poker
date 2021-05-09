import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomPreloadingStrategy } from 'src/app/app-preload-strategy';
import { FirebaseService } from 'src/app/services/firebase.service';
import { environment } from 'src/environments/environment';

// Import the AngularFire Module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule
  ],
  providers: [
    { 
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    CustomPreloadingStrategy,
    FirebaseService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
