import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  appStatus$ = this.http.get('v1');
  darkTheme$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  setDarkTheme(isDarkTheme: boolean): void {
    this.darkTheme$.next(isDarkTheme);
  }
}
