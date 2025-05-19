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
import { PaginationComponent } from "../../components/commons/pagination/pagination.component";

@Component({
  selector: 'app-liste-jeux',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PaginationComponent],
  templateUrl: './liste-jeux.component.html',
  styleUrls: ['./liste-jeux.component.css']
})
export class ListeJeuxComponent implements OnInit {
  jeux: Jeux[] = [];
  plateformes: Plateforme[] = [];
  niveauActuel: number = 0;
  tropheesActuels: any = {};
  allJeuxList: any[] = [];
  jeuxList: any[] = [];
  jeuxPerPage: number = 6;
  currentPage: number = 1;

  constructor(
    private jeuxService: JeuxService,
    private plateformeService: PlateformeService,
    private statsNiveauxService: StatsNiveauxService,
    private statsTropheesService: StatsTropheesService
  ) {}

  ngOnInit(): void {
    this.jeuxService.getAllJeux().subscribe({
      next: (data: Jeux[]) => {
        this.allJeuxList = data;
        this.updatePage(); // 👈 ajoute cette ligne
      },
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

  // Méthode pour mettre à jour les jeux visibles selon la page actuelle
  updatePage(): void {
    const totalPages = Math.ceil(this.allJeuxList.length / this.jeuxPerPage);

    // Si la page actuelle dépasse le total, revenir à la dernière page disponible
    if (this.currentPage > totalPages) {
      this.currentPage = 1;
    }

    const startIndex = (this.currentPage - 1) * this.jeuxPerPage;
    const endIndex = startIndex + this.jeuxPerPage;
    this.jeuxList = this.allJeuxList.slice(startIndex, endIndex);
  }

  // Méthode pour changer de page
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePage(); // Met à jour les jeux visibles
  }

  // Méthode pour générer les numéros de page
  get pageNumbers() {
    return Array.from({ length: Math.ceil(this.allJeuxList.length / this.jeuxPerPage) }, (_, i) => i + 1);
  }

  // Calcul du total de trophées pour un jeu
  calculateTotal(jeu: Jeux): number {
    return jeu.nbPlatine + jeu.nbOr + jeu.nbArgent + jeu.nbBronze;
  }

  // Calculs des totaux globaux
  calculateTotalPlatine(): number {
    return this.allJeuxList.reduce((total, jeu) => total + jeu.nbPlatine, 0);
  }

  calculateTotalOr(): number {
    return this.allJeuxList.reduce((total, jeu) => total + jeu.nbOr, 0);
  }

  calculateTotalArgent(): number {
    return this.allJeuxList.reduce((total, jeu) => total + jeu.nbArgent, 0);
  }

  calculateTotalBronze(): number {
    return this.allJeuxList.reduce((total, jeu) => total + jeu.nbBronze, 0);
  }

  calculateTotalTrophees(): number {
    return this.allJeuxList.reduce((total, jeu) => total + this.calculateTotal(jeu), 0);
  }

  calculateTotalHeures(): number {
    return this.allJeuxList.reduce((total, jeu) => total + jeu.nbHeures, 0);
  }

  getTotalCumulTrophees() {
    return {
      platine: this.calculateTotalPlatine() + this.tropheesActuels.nbPlatine,
      or: this.calculateTotalOr() + this.tropheesActuels.nbOr,
      argent: this.calculateTotalArgent() + this.tropheesActuels.nbArgent,
      bronze: this.calculateTotalBronze() + this.tropheesActuels.nbBronze,
      total: this.calculateTotalTrophees() + this.tropheesActuels.total
    };
  }

}
