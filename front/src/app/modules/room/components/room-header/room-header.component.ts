import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { IParticipant, IRoom } from 'src/app/modules/room/room.models';
import { VotingSystems } from 'src/app/modules/room/room.enums';
import { MatDialog } from '@angular/material/dialog';
import { InvitePeopleDialogComponent } from 'src/app/modules/room/components/dialogs/invite-people-dialog/invite-people-dialog.component';
import { LeaveRoomDialogComponent } from 'src/app/modules/room/components/dialogs/leave-room-dialog/leave-room-dialog.component';

@Component({
  selector: 'room-header',
  templateUrl: './room-header.component.html',
})
export class RoomHeaderComponent implements OnInit, OnDestroy {
  
  @Input() room: IRoom;
  @Input() isScrumMaster: boolean = false;
  @Input() participantInfo: IParticipant;

  readonly VotingSystems = VotingSystems;

  private subs: Subscription = new Subscription();

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    public matDialog: MatDialog
  ) {}

  ngOnInit() {
  }

  changeVotingSystem(votingSys) {
    this.room.votingSystemId = votingSys;
    this.firebaseService.addOrSetDocument('Rooms', this.room, this.room.id);
  }

  openInvitationDialog() {
    this.matDialog.open(InvitePeopleDialogComponent);
  }

  leaveRoom() {
    this.subs.add(
      this.matDialog
        .open(LeaveRoomDialogComponent)
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            const index = this.room.participants.findIndex(
              (par) => par.id === this.participantInfo.id
            );
            if (index >= 0) {
              this.room.participants.splice(index, 1);
              this.firebaseService.addOrSetDocument(
                'Rooms',
                this.room,
                this.room.id
              );
              this.router.navigateByUrl('/user/settings');
            }
          }
        })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
