import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterpretedEvent} from '../model';

@Injectable({
  providedIn: 'root'
})
export class InterpreterService {
  private domainPath = '/api/interpreter';

  constructor(private httpClient: HttpClient) {
  }

  getHistory() {
    return this.httpClient.get<InterpretedEvent[]>(`${this.domainPath}/history`);
  }

  // todo: handle case with Real numbers
  getInterpretation(num: number) {
    const params = new HttpParams().set("number", num)
    return this.httpClient.get<InterpretedEvent>(`${this.domainPath}`, {params});
  }
}
