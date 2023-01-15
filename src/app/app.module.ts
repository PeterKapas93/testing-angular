import {isDevMode, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {StoreModule} from '@ngrx/store'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HomeComponent} from './home/home.component'
import {HeaderComponent} from './shared/components/header/header.component'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {appReducer} from './store/app.state'
import {AuthModule} from './auth/auth.module'
import {LoginComponent} from './auth/login/login.component'
import {EffectsModule} from '@ngrx/effects'
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {AuthEffects} from './auth/state/auth.effects'
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot( /* {
       counter: counterReducer,
       myPosts: postsReducer
     }  */
      appReducer),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
