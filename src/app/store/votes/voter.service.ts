import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class VoterService {

  constructor(private http: Http) {}

  getVotes () {
    return this.http
        .get('http://localhost:4201/api/votes')
        .map(res => res.json().votes);
  }

  addVote () {
    return this.http
        .get('http://localhost:4201/api/votes/increment')
        .map(res => res.json().votes);
  }

  removeVote() {
    return this.http
        .get('http://localhost:4201/api/votes/decrement')
        .map(res => res.json().votes);
  }
}
