import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export interface EventBusArgs {
  type: string;
  data: any;
}

@Injectable()
export class EventBusService {
  private _messages$ = new Subject<EventBusArgs>();

  emit (eventType: string, data: any) {
    this._messages$.next({ type: eventType, data: data });
  }

  observe(eventType: string) {
    return this._messages$.filter(args => args.type === eventType)
                          .map(args => args.data);
  }
}
