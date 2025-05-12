import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JeuxPlateforme } from '../../models/JeuxPlateforme';

@Injectable({
  providedIn: 'root'
})
export class JeuxPlateformeService {
  private apiUrl = 'http://localhost:8080/api/jeux-plateforme';

  constructor(private http: HttpClient) {}

  getAll(): Observable<JeuxPlateforme[]> {
    return this.http.get<JeuxPlateforme[]>(`${this.apiUrl}/all`);
  }
}
