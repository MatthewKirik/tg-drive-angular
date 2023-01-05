import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TelegramLoginService {
  loggedIn$ = new BehaviorSubject<boolean>(sessionStorage.getItem('logged-in') === 'true');

  constructor(private ngZone: NgZone) {
    this.init();
  }

  init() {
    (window as any)['loginViaTelegram'] = (loginData: any) =>
      this.loginViaTelegram(loginData);
  }

  private loginViaTelegram(loginData: any) {
    this.ngZone.run(() =>
    {
      if (!!loginData) {
        sessionStorage.setItem('logged-in', 'true');
        this.loggedIn$.next(true);
      }
    });
  }
}
