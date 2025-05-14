import { Component, OnInit } from '@angular/core';
import { JeuxPlateforme } from '../../models/JeuxPlateforme';
import { Jeux } from '../../models/Jeux';
import { Plateforme } from '../../models/Plateforme';
import { JeuxPlateformeService } from '../../services/jeuxPlateforme/jeux-plateforme.service';
import { PlateformeService } from '../../services/plateforme/plateforme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JeuxService } from '../../services/jeux/jeux.service';

@Component({
  selector: 'app-liste-jeux',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './liste-jeux.component.html',
  styleUrls: ['./liste-jeux.component.css']
})
export class ListeJeuxComponent implements OnInit {
  jeuxPlateformes: JeuxPlateforme[] = [];
  jeux: Jeux[] = [];
  plateformes: Plateforme[] = [];

  constructor(
    private jpService: JeuxPlateformeService,
    private jeuxService: JeuxService,
    private plateformeService: PlateformeService
  ) {}

  ngOnInit(): void {
    this.jpService.getAllJeuxPlateforme().subscribe({
      next: (data) => this.jeuxPlateformes = data,
      error: (err) => console.error('Erreur JP', err)
    });

    this.jeuxService.getAllJeux().subscribe({
      next: (data: Jeux[]) => this.jeux = data,
      error: (err: any) => console.error('Erreur Jeux', err)
    });

    this.plateformeService.getAllPlateformes().subscribe({
      next: (data) => this.plateformes = data,
      error: (err) => console.error('Erreur Plateformes', err)
    });
    console.log(this.jeuxPlateformes);
  }

  // Calculer le nombre total de trophées pour un jeu
  calculateTotal(jp: any): number {
    return jp.nbPlatine + jp.nbOr + jp.nbArgent + jp.nbBronze;
  }

  // Calcul des totaux pour chaque colonne
  calculateTotalPlatine(): number {
    return this.jeuxPlateformes.reduce((total, jp) => total + jp.nbPlatine, 0);
  }

  calculateTotalOr(): number {
    return this.jeuxPlateformes.reduce((total, jp) => total + jp.nbOr, 0);
  }

  calculateTotalArgent(): number {
    return this.jeuxPlateformes.reduce((total, jp) => total + jp.nbArgent, 0);
  }

  calculateTotalBronze(): number {
    return this.jeuxPlateformes.reduce((total, jp) => total + jp.nbBronze, 0);
  }

  calculateTotalTrophees(): number {
    return this.jeuxPlateformes.reduce((total, jp) => total + jp.nbPlatine + jp.nbOr + jp.nbArgent + jp.nbBronze, 0);
  }

  calculateTotalHeures(): number {
    return this.jeuxPlateformes.reduce((total, jp) => total + jp.nbHeures, 0);
  }
}
