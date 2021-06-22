import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { ICurrentUserInfo } from 'src/app/modules/user/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { v4 as uuid } from 'uuid';
import { VotingSystems } from 'src/app/modules/room/room.enums';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'create-room',
  templateUrl: './create-room.component.html'
})
export class CreateRoomComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription();
  private currentUser: ICurrentUserInfo = null;

  public form: FormGroup;
  public dataLoaded: boolean = false;


  readonly VotingSystems = VotingSystems;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private formBuilder: FormBuilder,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.subs.add(
      this.firebaseService
        .getCurrentUserInfo()
        .subscribe(
          user => {
            this.currentUser = user;
            this.loadDate();
          }
        )
    );
  }

  loadDate() {
    this.form = this.formBuilder.group({
      id: [uuid(), Validators.required],
      name: [null, Validators.required],
      votingSystemId: [null, Validators.required]
    });

    this.dataLoaded = true;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let scrumParticipantInfo;
    if (localStorage.getItem('participantInfo'))  
      scrumParticipantInfo = JSON.parse(localStorage.getItem('participantInfo'));
    else {
      scrumParticipantInfo = {
        id: uuid(),
        name: this.currentUser.displayName,
        joinDate: new Date()
      }
    }

    const room = {
      ...this.form.value,
      creationDate: new Date(),
      scrumMasterId: this.currentUser.id,
      participants: [scrumParticipantInfo],
      rounds: [],
      isClosed: false
    }
    this.subs.add(
      from(this.firebaseService.addOrSetDocument('Rooms', room, room.id))
        .subscribe(
          data => {
            localStorage.setItem('participantInfo', JSON.stringify(scrumParticipantInfo));
            this.router.navigateByUrl(`/room/${room.id}`);
          },
          error => this.generalService.showSnackBar('Cannot create this room. Please try again later.')
        )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
