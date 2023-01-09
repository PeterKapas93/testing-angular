import {isDevMode, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {CounterComponent} from './counter/counter/counter.component'
import {CounterOutputComponent} from './counter/counter-output/counter-output.component'
import {CounterButtonsComponent} from './counter/counter-buttons/counter-buttons.component'
import {StoreModule} from '@ngrx/store'
import {counterReducer} from './counter/state/counter.reducer'
import {CustomCounterInputComponent} from './counter/custom-counter-input/custom-counter-input.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HomeComponent} from './home/home.component'
import {HeaderComponent} from './shared/components/header/header.component'
import {PostslistComponent} from './posts/postslist/posts-list.component'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {postsReducer} from './posts/postslist/state/posts.reducer'
import {appReducer} from './store/app.state'
import {AddPostComponent} from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component'

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CustomCounterInputComponent,
    HomeComponent,
    HeaderComponent,
    PostslistComponent,
    AddPostComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(/* {
      counter: counterReducer,
      myPosts: postsReducer
    } */
      appReducer),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
