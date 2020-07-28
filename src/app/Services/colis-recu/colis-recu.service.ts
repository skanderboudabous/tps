import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ColisRecu} from '../../Models/ColisRecu/colis-recu';
import {Observable} from 'rxjs';

const API = environment.apiUrl + 'colisrecu/';
@Injectable({
  providedIn: 'root'
})
export class ColisRecuService {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<ColisRecu[]> {
    return this.httpClient.get<ColisRecu[]>(`${API}all`);
  }

  addOne(colisRecu:ColisRecu):Observable<ColisRecu>{
    return this.httpClient.post<ColisRecu>(`${API}add`,colisRecu);
  }
  addAll(colisRecus:ColisRecu[]):Observable<ColisRecu[]>{
    return this.httpClient.post<ColisRecu[]>(`${API}addAll`,colisRecus);
  }

  getLastDays():Observable<ColisRecu[][]>{
    return this.httpClient.get<ColisRecu[][]>(`${API}getLastDays`);
  }
}
