import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgParticlesModule } from 'ng-particles';
import { CookieService } from 'ngx-cookie-service';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { TelegramLoginWidgetComponent } from './share/telegram-login-widget/telegram-login-widget.component';
import { HeaderComponent } from './home/header/header.component';
import { FileManagementComponent } from './home/file-management/file-management.component';
import { DirectoryTreeComponent } from './home/file-management/directory-tree/directory-tree.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WithCredentialsInterceptor } from './share/with-credentials-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    TelegramLoginWidgetComponent,
    HeaderComponent,
    FileManagementComponent,
    DirectoryTreeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    NgParticlesModule,
    TreeModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
