import { Injectable } from '@angular/core';
import { Plateforme } from '../../models/Plateforme';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlateformeService {
private apiUrl = 'http://localhost:8080/api/plateforme';

  constructor(private http: HttpClient) { }

  createJeu(plateforme: Plateforme): Observable<Plateforme> {
    return this.http.post<Plateforme>(this.apiUrl, plateforme);
  }

  getAllJeux(): Observable<Plateforme[]> {
    return this.http.get<Plateforme[]>(`${this.apiUrl}/all`);
  }

  getJeuById(id: number): Observable<Plateforme> {
    return this.http.get<Plateforme>(`${this.apiUrl}/${id}`);
  }

  updateJeu(plateforme: Plateforme): Observable<Plateforme> {
    return this.http.put<Plateforme>(`${this.apiUrl}/update`, plateforme);
  }

  deleteJeuById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  deleteAllJeux(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
