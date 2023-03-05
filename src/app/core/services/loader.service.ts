import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

export interface Loader {
  name: string,
  state: boolean,
}

@Injectable()
export class LoaderService {

  private _compontentLoader: Subject<Loader>;
  public compontentLoader$: Observable<Loader>;

  constructor() {
    this._compontentLoader = new Subject<Loader>();
    this.compontentLoader$ = this._compontentLoader.asObservable();
  }

  startLoader(name: string) {
    this._compontentLoader.next({ name, state: true });
  }

  stopLoader(name: string) {
    this._compontentLoader.next({ name, state: false });
  }
}
