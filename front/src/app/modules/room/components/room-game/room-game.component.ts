import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { IParticipant, IRoom } from 'src/app/modules/room/room.models';
import { ICurrentUserInfo } from 'src/app/modules/user/user.model';
import { v4 as uuid } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { NewParticipantDialogComponent } from 'src/app/modules/room/components/dialogs/new-participant-dialog/new-participant-dialog.component';

@Component({
  selector: 'room-game',
  templateUrl: './room-game.component.html',
})
export class RoomGameComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  private firstLoad: boolean = true;
  private currentUser: ICurrentUserInfo;
  private roomId: string = null;

  public room: IRoom;
  public isScrumMaster: boolean = false;
  public participantInfo: IParticipant;

  public dataLoaded: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.roomId = this.activatedRoute.snapshot.params.id;

    if (!this.roomId) this.router.navigateByUrl(`/room/new`);
    this.subs.add(
      this.firebaseService
        .getDocumentSnapshot('Rooms', this.roomId)
        .subscribe((room) => {
          if (room) {
            this.room = room;
            if (this.firstLoad) this.loadInfo();

            this.dataLoaded = true;
          } else {
            this.router.navigateByUrl(`/room/new`);
          }
        })
    );
  }

  loadInfo() {
    this.firstLoad = false;
    this.subs.add(
      this.firebaseService
        .getCurrentUserInfo()
        .subscribe((user: ICurrentUserInfo) => { // TO-DO: manage when refresh, user doesn't load rapidlly
          this.currentUser = user;
          this.isScrumMaster = user?.id === this.room.scrumMasterId;
          this.manageParticipant();
        })
    );
  }

  manageParticipant() {
    let localParticipantInfo = JSON.parse(
      localStorage.getItem('participantInfo')
    );

    if (
      localParticipantInfo &&
      !this.room.participants.find(
        (part) => part.id === localParticipantInfo.id
      )
    ) { // update with localStorage info
      this.addParticipant(localParticipantInfo);
    } else if (!localParticipantInfo && this.currentUser) { // update with new id and user displayname
      localParticipantInfo = {
        id: uuid(),
        name: this.currentUser.displayName,
        joinDate: new Date(),
      };
      this.addParticipant(localParticipantInfo);
    } else if (!this.currentUser && !localParticipantInfo) { // update with new id and displayname
      this.subs.add(
        this.matDialog
          .open(NewParticipantDialogComponent, { disableClose: true })
          .afterClosed()
          .subscribe(displayName => {
            localParticipantInfo = {
              id: uuid(),
              name: displayName,
              joinDate: new Date(),
            };
            this.addParticipant(localParticipantInfo);
          })
      )
    } else {
      this.participantInfo = localParticipantInfo;
    }
  }

  addParticipant(participant) {
    this.participantInfo = participant;
    localStorage.setItem('participantInfo', JSON.stringify(participant));
    this.room.participants.push(participant);
    this.firebaseService.addOrSetDocument('Rooms', this.room, this.roomId);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
