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

  // Ajouter un jeu
  createJeu(jeu: Jeux): Observable<Jeux> {
    return this.http.post<Jeux>(this.apiUrl, jeu);
  }

  // Récupérer tous les jeux
  getAllJeux(): Observable<Jeux[]> {
    return this.http.get<Jeux[]>(`${this.apiUrl}/all`);
  }

  // Récupérer un jeu par son ID
  getJeuById(id: number): Observable<Jeux> {
    return this.http.get<Jeux>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un jeu
  updateJeu(jeu: Jeux): Observable<Jeux> {
    return this.http.put<Jeux>(`${this.apiUrl}/update`, jeu);
  }

  // Supprimer un jeu par son ID
  deleteJeuById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer tous les jeux
  deleteAllJeux(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
