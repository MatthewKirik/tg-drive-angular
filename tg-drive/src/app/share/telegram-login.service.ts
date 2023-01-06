import { Injectable, NgZone } from '@angular/core';
import { CookieService } from 'ngx-cookie-service/public-api';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TelegramLoginService {
  loggedIn$ = new BehaviorSubject<boolean>(sessionStorage.getItem('logged-in') === 'true');

  constructor(
    private ngZone: NgZone,
    private cookieService: CookieService,
    ) {
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
        this.cookieService.set('tg-hash', loginData.hash);
        const dataCheckString = this.getDataCheckString(loginData);
        this.cookieService.set('tg-data', dataCheckString);
        this.loggedIn$.next(true);
      }
    });
  }

  private getDataCheckString(loginData: any) {
    const keyValues: string[] = [];
    for (const key in loginData) {
      if (key !== 'hash' && Object.prototype.hasOwnProperty.call(loginData, key)) {
        const value = loginData[key];
        keyValues.push(`${key}=${value}`);
      }
    }

    keyValues.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    return keyValues.join('\n');
  }
}
