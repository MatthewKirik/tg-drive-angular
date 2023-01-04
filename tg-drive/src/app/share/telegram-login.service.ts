import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TelegramLoginService {
  constructor(private ngZone: NgZone) {}

  init() {
    (window as any)['loginViaTelegram'] = (loginData: any) =>
      this.loginViaTelegram(loginData);
  }

  private loginViaTelegram(loginData: any) {
    this.ngZone.run(() =>
    {
      // TODO: process login
    });
  }
}
