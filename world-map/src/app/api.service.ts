import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private callApiSubject = new Subject<string>();
  callApi$ = this.callApiSubject.asObservable();

  constructor() { }

  callApi(param: string) {
    this.callApiSubject.next(param);
  }
}
