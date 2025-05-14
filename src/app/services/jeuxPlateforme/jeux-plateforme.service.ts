import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JeuxPlateforme } from '../../models/JeuxPlateforme';

@Injectable({
  providedIn: 'root'
})
export class JeuxPlateformeService {
  private apiUrl = 'http://localhost:8081/api/jeuxPlateforme';

  constructor(private http: HttpClient) {}

  // Ajouter une association entre un jeu et une plateforme
  createJeuxPlateforme(jeuPlateforme: JeuxPlateforme): Observable<JeuxPlateforme> {
    return this.http.post<JeuxPlateforme>(this.apiUrl, jeuPlateforme);
  }

  // Récupérer toutes les associations entre jeux et plateformes
  getAllJeuxPlateforme(): Observable<JeuxPlateforme[]> {
    return this.http.get<JeuxPlateforme[]>(`${this.apiUrl}/all`);
  }

  // Récupérer une association par son ID
  getJeuxPlateformeById(id: number): Observable<JeuxPlateforme> {
    return this.http.get<JeuxPlateforme>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une association
  updateJeuxPlateforme(jeuPlateforme: JeuxPlateforme): Observable<JeuxPlateforme> {
    return this.http.put<JeuxPlateforme>(`${this.apiUrl}/update`, jeuPlateforme);
  }

  // Supprimer une association par son ID
  deleteJeuxPlateformeById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer toutes les associations
  deleteAllJeuxPlateforme(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
