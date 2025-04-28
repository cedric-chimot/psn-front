import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jeux } from '../../models/Jeux';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JeuxService {
  private apiUrl = 'http://localhost:8080/api/jeux';

  constructor(private http: HttpClient) { }

  createJeu(jeu: Jeux): Observable<Jeux> {
    return this.http.post<Jeux>(this.apiUrl, jeu);
  }

  getAllJeux(): Observable<Jeux[]> {
    return this.http.get<Jeux[]>(`${this.apiUrl}/all`);
  }

  getJeuById(id: number): Observable<Jeux> {
    return this.http.get<Jeux>(`${this.apiUrl}/${id}`);
  }

  updateJeu(jeu: Jeux): Observable<Jeux> {
    return this.http.put<Jeux>(`${this.apiUrl}/update`, jeu);
  }

  deleteJeuById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  deleteAllJeux(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
