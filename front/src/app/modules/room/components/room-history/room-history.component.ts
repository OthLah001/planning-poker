import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { IParticipant, IRoom, IVote } from 'src/app/modules/room/room.models';
import { calculateStatics } from '../../room.utils';

@Component({
  selector: 'room-history',
  templateUrl: './room-history.component.html'
})
export class RoomHistoryComponent implements OnChanges, OnDestroy {
  @Input() room: IRoom;

  public roundsHistory = [];

  private subs: Subscription = new Subscription();

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnChanges() {
    this.roundsHistory = [];
    const getParticipantAndVoteForRound = (participants: IParticipant[], votes: IVote[]) => {
      const data = [];
      for (const vote of votes) {
        data.push({
          participant: participants.find(par => par.id === vote.participantId).name,
          point: vote.point
        });
      }

      return data;
    }

    for (const round of this.room.rounds) {
      const stats = calculateStatics(round.votes);
      this.roundsHistory.push({
        votes: getParticipantAndVoteForRound(this.room.participants, round.votes),
        stats,
        statsKeys: Object.keys(stats)
      });
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
