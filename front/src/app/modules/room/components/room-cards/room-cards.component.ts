import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { VotingSystems } from 'src/app/modules/room/room.enums';
import { IRoom, IParticipant, IRound } from 'src/app/modules/room/room.models';

@Component({
  selector: 'room-cards',
  templateUrl: './room-cards.component.html',
  styles: [`
    .card {
      cursor: pointer;
    }
  `]
})
export class RoomCardsComponent implements OnChanges, OnDestroy {
  @Input() room: IRoom;
  @Input() participantInfo: IParticipant;
  @Input() currentRound: IRound;

  public cards: string[] = [];
  public choseCardIndex: number = -1;

  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnChanges() {
    this.cards = VotingSystems.find(sys => sys.id === this.room.votingSystemId).points;
  }

  chooseCard(index, card) {
    this.choseCardIndex = index;
    this.currentRound.votes.some(vote => {
      if (vote.participantId === this.participantInfo.id) {
        vote.point = card;
        vote.votingDate = new Date() as any;

        return true;
      }
    });
    this.firebaseService.addOrSetDocument('CurrentRounds', this.currentRound, this.room.id);
  }

  ngOnDestroy() {
  }
}
