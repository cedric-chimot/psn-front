import { Injectable } from '@angular/core';
import { Annee } from '../../models/Annee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnneeService {
  private apiUrl = 'http://localhost:8081/api/annees';

  constructor(private http: HttpClient) { }

  // Ajouter une année
  createAnnee(annee: Annee): Observable<Annee> {
    return this.http.post<Annee>(`${this.apiUrl}/create`, annee);
  }

  // Récupérer toutes les années
  getAllAnnees(): Observable<Annee[]> {
    return this.http.get<Annee[]>(`${this.apiUrl}/all`);
  }

  // Récupérer une année par son ID
  getAnneeById(id: number): Observable<Annee> {
    return this.http.get<Annee>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une année
  updateAnnee(annee: Annee): Observable<Annee> {
    return this.http.put<Annee>(`${this.apiUrl}/update`, annee);
  }

  // Supprimer une année par son ID
  deleteAnneeById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer toutes les années
  deleteAllAnnees(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
