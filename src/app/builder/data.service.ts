import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  steps:string[] = [
    'one',
    'two',
    'three',
    'four'
  ];

  stepSource = new BehaviorSubject('0'); // или засетить из локал сторейдж
  
  stepIndex = this.stepSource.asObservable();

  getCurrentStep() {
    this.stepSource.next(this.stepSource.value);
  }

  nextStep() {
    this.stepSource.next(+(this.stepSource.value) + 1 + '');
  }

  prevStep() {
    this.stepSource.next(+(this.stepSource.value) - 1 + '');
  }

  constructor(private http: HttpClient) { }

  get(url, body?) {
    if (url[0] == '/') {
      url = 'http://www.likmap.org:8080' + url;
    }
    return this.http.get(url, {params: body});
  }

  send(url, body) {
    url = 'http://www.likmap.org:8070' + url;
    return this.http.post(url, body);
  }
}
