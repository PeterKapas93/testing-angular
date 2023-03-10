import {Injectable} from "@angular/core"
import {Router} from "@angular/router"
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {Store} from "@ngrx/store"
import {catchError, exhaustMap, map, mergeMap, of, tap} from "rxjs"
import {AuthService} from "src/app/services/auth.service"
import {AppState} from "src/app/store/app.state"
import {setErrorMessage, setLoadingSpinner} from "src/app/store/shared/shared.action"
import {autoLogin, autoLogout, loginStart, loginSuccess, signUpStart, signUpSuccess} from "./auth.actions"

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            this.store.dispatch(setErrorMessage({message: ''}))
            const user = this.authService.formatUser(data)
            this.authService.setUserInLocalStorage(user)
            return loginSuccess({user, redirect: true})
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            )
            return of(setErrorMessage({message: errorMessage}))
          })
        )
      })
    )
  });

  loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[loginSuccess, signUpSuccess]),
      tap(action => {
        this.store.dispatch(setErrorMessage({message: ''}))
        if (action.redirect) {}
        this.router.navigate(['/'])
      })
    )
  }, {dispatch: false})

  signUp$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(signUpStart),
        exhaustMap((action) => {
          return this.authService.signup(action.email, action.password)
            .pipe(map((data) => {
              this.store.dispatch(setLoadingSpinner({status: false}))
              const user = this.authService.formatUser(data)
              this.authService.setUserInLocalStorage(user)
              return signUpSuccess({user, redirect: true})
            }),
              catchError((errResp) => {
                this.store.dispatch(setLoadingSpinner({status: true}))
                const errorMessage = this.authService.getErrorMessage(errResp.error.error.message)
                return of(setErrorMessage({message: errorMessage}))
              })
            )
        })
      )
  })
  /* 
    signUpRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(signUpSuccess),
        tap(action => {
          this.router.navigate(['/'])
          this.store.dispatch(setErrorMessage({message: ''}))
        })
      )
    }, {dispatch: false}) */

  autoLogin$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(autoLogin),
        mergeMap((action) => {
          const user = this.authService.getUserFromLocalStorage()
          return of(loginSuccess({user, redirect: false}))
        }))
  })

  logout$ = createEffect(() => {
    return this.actions$.pipe(ofType(autoLogout),
      map((action) => {
        this.authService.logout()
        this.router.navigate(['auth'])
      })
    )
  }, {dispatch: false})
}