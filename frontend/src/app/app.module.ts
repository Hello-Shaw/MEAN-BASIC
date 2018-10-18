import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {routingComponents,RoutingModule} from "./routing.module";
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { GiftComponent } from './components/gift/gift.component';
import { GiftService } from "./services/gift.service";
import {AuthGuard} from "./auth.guard";
import {TokenService} from "./services/token.service";
import { SendmailComponent } from './components/sendmail/sendmail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    routingComponents,
    GiftComponent,
    SendmailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    HttpClientModule,
    RoutingModule,
    MatSelectModule,
    MatListModule,
    MatCardModule

  ],
  providers: [GiftService,AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
