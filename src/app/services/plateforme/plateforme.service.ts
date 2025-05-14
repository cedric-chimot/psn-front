import { Injectable } from '@angular/core';
import { Plateforme } from '../../models/Plateforme';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlateformeService {
  private apiUrl = 'http://localhost:8081/api/plateforme';

  constructor(private http: HttpClient) { }

  // Ajouter une plateforme
  createPlateforme(plateforme: Plateforme): Observable<Plateforme> {
    return this.http.post<Plateforme>(this.apiUrl, plateforme);
  }

  // Récupérer toutes les plateformes
  getAllPlateformes(): Observable<Plateforme[]> {
    return this.http.get<Plateforme[]>(`${this.apiUrl}/all`);
  }

  // Récupérer une plateforme par son ID
  getPlateformeById(id: number): Observable<Plateforme> {
    return this.http.get<Plateforme>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une plateforme
  updatePlateforme(plateforme: Plateforme): Observable<Plateforme> {
    return this.http.put<Plateforme>(`${this.apiUrl}/update`, plateforme);
  }

  // Supprimer une plateforme par son ID
  deletePlateformeById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer toutes les plateformes
  deleteAllPlateformes(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
