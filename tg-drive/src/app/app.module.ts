import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgParticlesModule } from 'ng-particles';
import { CookieService } from 'ngx-cookie-service';
import { ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { TelegramLoginWidgetComponent } from './share/telegram-login-widget/telegram-login-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    TelegramLoginWidgetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    NgParticlesModule,
  ],
  providers: [
    [CookieService],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
