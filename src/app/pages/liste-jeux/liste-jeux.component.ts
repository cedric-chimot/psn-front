import { Component, OnInit } from '@angular/core';
import { Jeux } from '../../models/Jeux';
import { Plateforme } from '../../models/Plateforme';
import { JeuxService } from '../../services/jeux/jeux.service';
import { PlateformeService } from '../../services/plateforme/plateforme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StatsNiveauxService } from '../../services/statsNiveaux/stats-niveaux.service';
import { StatsTropheesService } from '../../services/statsTrophees/stats-trophees.service';

@Component({
  selector: 'app-liste-jeux',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './liste-jeux.component.html',
  styleUrls: ['./liste-jeux.component.css']
})
export class ListeJeuxComponent implements OnInit {
  jeux: Jeux[] = [];
  plateformes: Plateforme[] = [];
  niveauActuel: number = 0;
  tropheesActuels: any = {};

  constructor(
    private jeuxService: JeuxService,
    private plateformeService: PlateformeService,
    private statsNiveauxService: StatsNiveauxService,
    private statsTropheesService: StatsTropheesService
  ) {}

  ngOnInit(): void {
    this.jeuxService.getAllJeux().subscribe({
      next: (data: Jeux[]) => this.jeux = data,
      error: (err: any) => console.error('Erreur Jeux', err)
    });

    this.plateformeService.getAllPlateformes().subscribe({
      next: (data) => this.plateformes = data,
      error: (err) => console.error('Erreur Plateformes', err)
    });
    this.loadNiveauActuel();
    this.loadTropheesActuels();
  }

  // Récupération des statistiques de niveaux pour l'année actuelle
  loadNiveauActuel() {
    this.statsNiveauxService.getAllStatsNiveaux().subscribe(stats => {
      const anneeCourante = 6; // ID année 2025
      const stat = stats.find(s => s.niveauAnnee.id === anneeCourante);
      if (stat) this.niveauActuel = stat.niveau;
    });
  }

  // Récupération des statistiques de trophées pour l'année actuelle
  loadTropheesActuels() {
    this.statsTropheesService.getAllStatsTrophees().subscribe(stats => {
      const anneeCourante = 6; // ID année 2025
      const stat = stats.find(s => s.tropheeAnnee.id === anneeCourante);
      if (stat) {
        const total = stat.nbPlatine + stat.nbOr + stat.nbArgent + stat.nbBronze;
        this.tropheesActuels = { ...stat, total };
      }
    });
  }

  // Calcul du total de trophées pour un jeu
  calculateTotal(jeu: Jeux): number {
    return jeu.nbPlatine + jeu.nbOr + jeu.nbArgent + jeu.nbBronze;
  }

  // Calculs des totaux globaux
  calculateTotalPlatine(): number {
    return this.jeux.reduce((total, jeu) => total + jeu.nbPlatine, 0);
  }

  calculateTotalOr(): number {
    return this.jeux.reduce((total, jeu) => total + jeu.nbOr, 0);
  }

  calculateTotalArgent(): number {
    return this.jeux.reduce((total, jeu) => total + jeu.nbArgent, 0);
  }

  calculateTotalBronze(): number {
    return this.jeux.reduce((total, jeu) => total + jeu.nbBronze, 0);
  }

  calculateTotalTrophees(): number {
    return this.jeux.reduce((total, jeu) => total + this.calculateTotal(jeu), 0);
  }

  calculateTotalHeures(): number {
    return this.jeux.reduce((total, jeu) => total + jeu.nbHeures, 0);
  }
}
