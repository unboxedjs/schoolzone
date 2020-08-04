import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  appStatus$ = this.http.get('v1');
  constructor(private http: HttpClient) {}
}
