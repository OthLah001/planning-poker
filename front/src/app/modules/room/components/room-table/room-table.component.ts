import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { IParticipant, IRoom, IRound } from 'src/app/modules/room/room.models';
import { calculateStatics } from 'src/app/modules/room/room.utils';

@Component({
  selector: 'room-table',
  templateUrl: './room-table.component.html',
  styles: [`
    .choose-and-hide, .not-choose{
      width: 50px;
      height: 50px;
    }

    .choose-and-hide {
      background-color: green;
    }
    .not-choose {
      background-color: grey;
    }
  `]
})
export class RoomTableComponent implements OnChanges, OnDestroy {
  @Input() room: IRoom;
  @Input() isScrumMaster: boolean;
  @Input() currentRound: IRound;

  public votes = [];
  public statistics: { [key: string]: number };
  public staticticKeys: string[];

  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnChanges() {
    this.votes = [];
    for (const vote of this.currentRound.votes) {
      const participant: IParticipant = this.room.participants.find(part => part.id === vote.participantId);
      this.votes.push({
        participantName: participant.name,
        point: vote.point,
        roomJoinDate: participant.joinDate
      });
    }
    this.votes.sort((a, b) => {
      if (a.roomJoinDate > b.roomJoinDate)  return 1;
      else if (a.roomJoinDate < b.roomJoinDate) return -1;
      else  return 0;
    });

    if (this.currentRound.showCards) {
      this.statistics = calculateStatics(this.currentRound.votes);
      this.staticticKeys = Object.keys(this.statistics);
    }
  }

  showCards() {
    this.firebaseService.addOrSetDocument('CurrentRounds', {
      ...this.currentRound,
      showCards: true
    }, this.room.id);
  }

  async generateNewRound() {
    this.room.rounds.push(this.currentRound)
    await this.firebaseService.addOrSetDocument('Rooms', this.room, this.room.id);

    this.firebaseService.addOrSetDocument('CurrentRounds', {
      roomId: this.room.id,
      votes: [],
      creationDate: new Date(),
      showCards: false
    }, this.room.id);
  }

  ngOnDestroy() {
  }
}
