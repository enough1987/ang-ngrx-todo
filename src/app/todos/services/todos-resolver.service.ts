import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GET_TODOS_URL, Todo } from '../+store/todo.dictionary';
import { AppState } from '../../+store/app.state';
import { Store } from '@ngrx/store';
import {SetupTodo, SideEffectTodo} from '../+store/todo.actions';


@Injectable()
export class TodosResolverService implements Resolve<void> {
  constructor(private http: HttpClient,
              private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    console.log(' - TEST - ');
    this.http.get<Todo[]>(GET_TODOS_URL).subscribe(todos => {
      console.log(todos);
      this.store.dispatch(new SetupTodo(todos));
      this.store.dispatch(new SideEffectTodo());
    });
  }
}
