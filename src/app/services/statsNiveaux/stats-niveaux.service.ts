import { Injectable } from '@angular/core';
import { StatsNiveaux } from '../../models/StatsNiveaux';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsNiveauxService {
  private apiUrl = 'http://localhost:8081/api/statsNiveaux';

  constructor(private http: HttpClient) { }

  // Ajouter une statistique de niveaux
  createStatsNiveaux(statsNiveaux: StatsNiveaux): Observable<StatsNiveaux> {
    return this.http.post<StatsNiveaux>(this.apiUrl, statsNiveaux);
  }

  // Récupérer toutes les statistiques de niveaux
  getAllStatsNiveaux(): Observable<StatsNiveaux[]> {
    return this.http.get<StatsNiveaux[]>(`${this.apiUrl}/all`);
  }

  // Récupérer une statistique de niveaux par son ID
  getStatsNiveauxById(id: number): Observable<StatsNiveaux> {
    return this.http.get<StatsNiveaux>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une statistique de niveaux
  updateStatsNiveaux(statsNiveaux: StatsNiveaux): Observable<StatsNiveaux> {
    return this.http.put<StatsNiveaux>(`${this.apiUrl}/update`, statsNiveaux);
  }

  // Supprimer une statistique de niveaux par son ID
  deleteStatsNiveauxById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer toutes les statistiques de niveaux
  deleteAllStatsNiveaux(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
