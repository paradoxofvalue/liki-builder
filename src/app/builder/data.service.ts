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

  url = 'http://www.likmap.org:8080/add-complex-one/45';

  getData() {
    return this.http.get(this.url);
  }

  get(url, body?) {
    return this.http.get(url, {params: body});
  }

  send(url, body) {
    return this.http.post(url, body);
  }
}
