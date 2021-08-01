import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'invite-people-dialog',
  templateUrl: './invite-people-dialog.component.html'
})
export class InvitePeopleDialogComponent {
  public roomUrl: string = window.location.href;

  constructor(
    private generalService: GeneralService
  ) {}

  async copyURL() {
    await navigator.clipboard.writeText(this.roomUrl);
    this.generalService.showSnackBar('URL copied successfully.')
  }
}
