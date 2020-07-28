import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Colisexp} from '../../Models/ColisExp/colis-exp';
import {Observable} from 'rxjs';

const API = environment.apiUrl + 'colisexp/';

@Injectable({
  providedIn: 'root'
})
export class ColisExpService {

  constructor(private httpClient: HttpClient) {
  }

  public add(colisexp: Colisexp): Observable<Colisexp> {
    return this.httpClient.post<Colisexp>(`${API}add`, colisexp);
  }

  public update(id: string, colisexp): Observable<Colisexp> {
    return this.httpClient.patch<Colisexp>(`${API}${id}`, colisexp);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${API}delete/${id}`);
  }

  public getAll(): Observable<Colisexp[]> {
    return this.httpClient.get<any>(`${API}all`);
  }

  public getOne(id: string): Observable<Colisexp> {
    return this.httpClient.get<Colisexp>(`${API}${id}`);
  }
}
