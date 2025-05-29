import { StatsTrophees } from './../../models/StatsTrophees';
import { Annee } from './../../models/Annee';
import { Component, OnInit } from '@angular/core';
import { BoutonsNavigationComponent } from "../../components/commons/boutons-navigation/boutons-navigation.component";
import { StatsNiveaux } from '../../models/StatsNiveaux';
import { StatsNiveauxService } from '../../services/statsNiveaux/stats-niveaux.service';
import { StatsTropheesService } from '../../services/statsTrophees/stats-trophees.service';
import { AnneeService } from '../../services/annee/annee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GraphComponent } from "../../components/commons/graph/graph.component";

@Component({
  selector: 'app-stats',
  imports: [BoutonsNavigationComponent, CommonModule, FormsModule, RouterModule, GraphComponent],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  statsTrophees: StatsTrophees[] = [];
  statsNiveaux: StatsNiveaux[] = [];
  annees: Annee[] = [];
  niveauActuel: number = 0;
  vueActive: 'trophees' | 'niveaux' | 'graphiques' = 'trophees';
  isTropheesModalOpen = false;
  isNiveauxModalOpen = false;
  dernierAnnee: string = '';

  selectedTropheesAnneeForEdit: StatsTrophees | null = null;
  selectedNiveauxAnneeForEdit: StatsNiveaux | null = null;

  constructor(
    private statsNiveauxService: StatsNiveauxService,
    private statsTropheesService: StatsTropheesService,
    private anneeService: AnneeService
  ) {}

  ngOnInit(): void {
    this.loadStatsTrophees();
    this.loadStatsNiveaux();
    this.loadAnnees();
    this.loadNiveauActuel();
  }

  loadNiveauActuel() {
    this.statsNiveauxService.getAllStatsNiveaux().subscribe(stats => {
      const anneeCourante = 6; // ID année 2025
      this.niveauActuel = stats.find(stat => stat.niveauAnnee.id === anneeCourante)?.niveau || 0;
    });
  }

  loadStatsTrophees() {
    this.statsTropheesService.getAllStatsTrophees().subscribe({
      next: (data: StatsTrophees[]) => {
        this.statsTrophees = data;
        // Trouver la dernière année dans les données (format string, ex: "31 mai 2025")
        // Ici on suppose que 'annee' est une chaîne avec une date ou année

        // Extraire l'année au format numérique
        const anneesNumeriques = this.statsTrophees.map(s => {
          const parts = s.tropheeAnnee.annee.match(/\d{4}$/); // cherche 4 chiffres à la fin
          return parts ? +parts[0] : 0;
        });
        const maxAnnee = Math.max(...anneesNumeriques);

        // Trouver la chaîne complète correspondant à cette année max
        const dernierStat = this.statsTrophees.find(s => {
          const parts = s.tropheeAnnee.annee.match(/\d{4}$/);
          return parts && +parts[0] === maxAnnee;
        });
        this.dernierAnnee = dernierStat ? dernierStat.tropheeAnnee.annee : '';
      },
      error: (err) => console.error(err)
    });
  }

  loadStatsNiveaux() {
    this.statsNiveauxService.getAllStatsNiveaux().subscribe({
      next: (data: StatsNiveaux[]) => {
        this.statsNiveaux = data;
      },
      error: (err: any) => console.error('Erreur StatsNiveaux', err)
    });
  }

  loadAnnees() {
    this.anneeService.getAllAnnees().subscribe({
      next: (data: Annee[]) => {
        this.annees = data;
      },
      error: (err: any) => console.error('Erreur Annees', err)
    });
  }

  // Calcul du total de trophées gagnés par année
  getTropheesGagnesParAnnee(): StatsTrophees[] {
    // Trie par année décroissante
    const sortedStats = [...this.statsTrophees].sort((a, b) => b.tropheeAnnee.id - a.tropheeAnnee.id);

    const result: StatsTrophees[] = [];

    for (let i = 0; i < sortedStats.length - 1; i++) {
      const anneeActuelle = sortedStats[i];
      const anneePrecedente = sortedStats[i + 1]; // ici +1 car on va vers les années plus anciennes

      result.push({
        id: 0,
        tropheeAnnee: anneeActuelle.tropheeAnnee,
        nbPlatine: anneeActuelle.nbPlatine - anneePrecedente.nbPlatine,
        nbOr: anneeActuelle.nbOr - anneePrecedente.nbOr,
        nbArgent: anneeActuelle.nbArgent - anneePrecedente.nbArgent,
        nbBronze: anneeActuelle.nbBronze - anneePrecedente.nbBronze,
      });
    }

    return result;
  }

  // Calcul du total de niveaux gagnés par année
  getNiveauxGagnesParAnnee(): StatsNiveaux[] {
    const sortedStats = [...this.statsNiveaux].sort((a, b) => b.niveauAnnee.id - a.niveauAnnee.id);

    const result: StatsNiveaux[] = [];

    for (let i = 0; i < sortedStats.length - 1; i++) {
      const anneeActuelle = sortedStats[i];
      const anneePrecedente = sortedStats[i + 1];

      result.push({
        id: 0,
        niveauAnnee: anneeActuelle.niveauAnnee,
        niveau: anneeActuelle.niveau - anneePrecedente.niveau
      });
    }

    return result;
  }

  // Récupération de l'année à partir de l'ID
  // On suppose que l'année est toujours la dernière partie de la chaîne
  getAnneeFromId(id: number): string {
    const annee = this.annees.find(a => a.id === id);
    if (annee && typeof annee.annee === 'string') {
      // On prend le dernier "mot" de la chaîne, qui est l’année
      return annee.annee.split(' ').pop() || '';
    }
    return '';
  }

  // Méthode pour ouvrir le modal trophées
  openTropheeModal(trophees: StatsTrophees): void {
    this.selectedTropheesAnneeForEdit = { ...trophees } as StatsTrophees;
    this.isTropheesModalOpen = true;  // ça ouvre le modal
  }

  // Méthode pour ouvrir le modal niveaux
  openNiveauxModal(niveaux: StatsNiveaux): void {
    this.selectedNiveauxAnneeForEdit = { ...niveaux } as StatsNiveaux;
    this.isNiveauxModalOpen = true;  // ça ouvre le modal
  }

  // Méthode pour mettre à jour les statistiques de trophées d'une année
  updateTrophees(): void {
    const stat = this.selectedTropheesAnneeForEdit;
    if (stat && stat.tropheeAnnee) {  // Vérifie que l'objet et sa propriété ne sont pas nuls
      const updatedStatsTrophees: StatsTrophees = {
        id: stat.id,
        nbPlatine: stat.nbPlatine,
        nbOr: stat.nbOr,
        nbArgent: stat.nbArgent,
        nbBronze: stat.nbBronze,
        tropheeAnnee: {
          id: stat.tropheeAnnee.id,
          annee: stat.tropheeAnnee.annee,
        },
      };

      this.statsTropheesService.updateStatsTrophees(updatedStatsTrophees).subscribe({
        next: () => {
          // Mise à jour de l'année après la maj des trophées
          this.anneeService.updateAnnee(stat.tropheeAnnee).subscribe({
            next: () => {
              this.loadStatsTrophees();
              this.loadStatsNiveaux(); // Recharger les stats niveaux pour mettre à jour l'affichage
              this.isTropheesModalOpen = false;
            },
            error: err => console.error('Erreur lors de la mise à jour de l\'année :', err),
          });
        },
        error: err => console.error('Erreur lors de la mise à jour des stats :', err),
      });
    } else {
      console.error('Données sélectionnées invalides pour la mise à jour');
    }
  }

  // Méthode pour mettre à jour les statistiques de trophées d'une année
  updateNiveaux(): void {
    const stat = this.selectedNiveauxAnneeForEdit;
    if (stat && stat.niveauAnnee) {  // Vérifie que l'objet et sa propriété ne sont pas nuls
      const updatedStatsNiveaux: StatsNiveaux = {
        id: stat.id,
        niveau: stat.niveau,
        niveauAnnee: {
          id: stat.niveauAnnee.id,
          annee: stat.niveauAnnee.annee,
        },
      };

      this.statsNiveauxService.updateStatsNiveaux(updatedStatsNiveaux).subscribe({
        next: () => {
          // Mise à jour de l'année après la maj des trophées
          this.anneeService.updateAnnee(stat.niveauAnnee).subscribe({
            next: () => {
              this.loadStatsNiveaux();
              this.isNiveauxModalOpen = false;
            },
            error: err => console.error('Erreur lors de la mise à jour de l\'année :', err),
          });
        },
        error: err => console.error('Erreur lors de la mise à jour des stats :', err),
      });
    } else {
      console.error('Données sélectionnées invalides pour la mise à jour');
    }
  }

  // Fermer le modal
  closeModal(): void {
    this.isTropheesModalOpen = false;
    this.isNiveauxModalOpen = false;
  }

  // Récupération de la couleur de fond en fonction de l'année
  getCouleurFondParAnnee(annee: string): string {
    switch (annee) {
      case '2025': return '#0f52ba';
      case '2024': return '#63c8f0';
      case '2023': return '#e3c035';
      case '2022': return '#929090';
      case '2021': return '#cd7f32';
      case '2020': return '#00468c';
      default: return '#000000';
    }
  }

  // Calcul du total de trophées par années
  calculateTotal(statsTrophees: StatsTrophees): number {
    return statsTrophees.nbPlatine + statsTrophees.nbOr + statsTrophees.nbArgent + statsTrophees.nbBronze;
  }

  // Changer la vue active
  changerVue(type: 'trophees' | 'niveaux' | 'graphiques'): void {
    this.vueActive = type;
  }

  // Prépare labels (années) et data (totaux trophées)
  getChartDataForTropheesDiff(): { labels: string[], data: number[], colors: string[] } {
    const stats = this.getTropheesGagnesParAnnee().slice().reverse(); // Inverser l'ordre pour avoir les années de 2025 à 2020

    const labels = stats.map(s => s.tropheeAnnee.annee);
    const data = stats.map(s =>
      s.nbPlatine + s.nbOr + s.nbArgent + s.nbBronze
    );
    const colors = stats.map(s =>
      this.getCouleurFondParAnnee(this.getAnneeFromId(s.tropheeAnnee.id))
    );

    return { labels, data, colors };
  }

  // Prépare labels (années) et data (totaux niveaux)
  getChartDataForNiveauxDiff(): { labels: string[], data: number[], colors: string[] } {
    const stats = this.getNiveauxGagnesParAnnee().slice().reverse(); // Inverser l'ordre pour avoir les années de 2025 à 2020

    const labels = stats.map(s => s.niveauAnnee.annee);
    const data = stats.map(s => s.niveau);
    const colors = stats.map(s =>
      this.getCouleurFondParAnnee(this.getAnneeFromId(s.niveauAnnee.id))
    );

    return { labels, data, colors };
  }

}
