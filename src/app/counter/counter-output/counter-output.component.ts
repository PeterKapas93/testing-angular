import {OnDestroy} from '@angular/core'
import {OnInit} from '@angular/core'
import {Component} from '@angular/core'
import {Store} from '@ngrx/store'
import {count, Observable} from 'rxjs'
import {Subscription} from 'rxjs'
import {AppState} from 'src/app/store/app.state'
import {getCounter} from '../state/counter.selector'
import {CounterState} from '../state/counter.state'

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  // counter: number
  // counter$: Observable<{counter: number}>
  // counterSubscription: Subscription
  counter$: Observable<number>

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // this.counterSubscription = this.store.select('counter').subscribe(data => {
    //   this.counter = data.counter
    // })
    // this.counter$ = this.store.select('counter')
    this.counter$ = this.store.select(getCounter)/* .subscribe(data => {
      console.log('Counter observable called')
      this.counter = data
    }) */
  }

  ngOnDestroy(): void {
    // if (this.counterSubscription) {
    //   this.counterSubscription.unsubscribe()
    // }
  }
}
