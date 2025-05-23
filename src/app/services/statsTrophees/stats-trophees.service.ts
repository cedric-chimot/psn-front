import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatsTrophees } from '../../models/StatsTrophees';

@Injectable({
  providedIn: 'root'
})
export class StatsTropheesService {
  private apiUrl = 'http://localhost:8081/api/statsTrophees';

  constructor(private http: HttpClient) { }

  // Ajouter une statistique de statistique de trophées
  createStatsTrophees(statsTrophees: StatsTrophees): Observable<StatsTrophees> {
    return this.http.post<StatsTrophees>(`${this.apiUrl}/create`, statsTrophees);
  }

  // Récupérer toutes les statistiques de statistique de trophées
  getAllStatsTrophees(): Observable<StatsTrophees[]> {
    return this.http.get<StatsTrophees[]>(`${this.apiUrl}/all`);
  }

  // Récupérer une statistique de statistique de trophées par son ID
  getStatsTropheesById(id: number): Observable<StatsTrophees> {
    return this.http.get<StatsTrophees>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une statistique de statistique de trophées
  updateStatsTrophees(statsTrophees: StatsTrophees): Observable<StatsTrophees> {
    return this.http.patch<StatsTrophees>(`${this.apiUrl}/update`, statsTrophees);
  }

  // Supprimer une statistique de statistique de trophées par son ID
  deleteStatsTropheesById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer toutes les statistiques de statistique de trophées
  deleteAllStatsTrophees(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
