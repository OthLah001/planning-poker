import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'email-link',
  template: ``
})
export class EmailLinkComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const mode = this.activatedRoute.snapshot.queryParamMap.get('mode');
    const oobCode = this.activatedRoute.snapshot.queryParamMap.get('oobCode');

    switch(mode) {
      case 'resetPassword':
        this.router.navigateByUrl(`/user/reset-password?oobCode=${oobCode}`);
        break;
      case 'verifyEmail':
        this.router.navigateByUrl(`/user/verify-email?oobCode=${oobCode}`);
        break;
    }
  }
}
