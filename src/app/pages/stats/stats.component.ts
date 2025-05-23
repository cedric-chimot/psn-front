import { StatsTrophees } from './../../models/StatsTrophees';
import { Annee } from './../../models/Annee';
import { Component, OnInit } from '@angular/core';
import { BoutonsNavigationComponent } from "../../components/commons/boutons-navigation/boutons-navigation.component";
import { StatsNiveaux } from '../../models/StatsNiveaux';
import { StatsNiveauxService } from '../../services/statsNiveaux/stats-niveaux.service';
import { StatsTropheesService } from '../../services/statsTrophees/stats-trophees.service';
import { AnneeService } from '../../services/annee/annee.service';

@Component({
  selector: 'app-stats',
  imports: [BoutonsNavigationComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {
  statsTrophees: StatsTrophees[] = [];
  statsNiveaux: StatsNiveaux[] = [];
  annees: Annee[] = [];
  niveauActuel: number = 0;
  vueActive: 'trophees' | 'niveaux' = 'trophees';

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
      },
      error: (err: any) => console.error('Erreur StatsTrophees', err)
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

  // Récupération de la couleur de fond en fonction de l'année
  getCouleurFondParAnnee(annee: string): string {
    switch (annee) {
      case '2025': return '#0f52ba';
      case '2024': return '#63c8f0';
      case '2023': return '#e3c035';
      case '2022': return '#dda0dd';
      case '2021': return '#FF0066';
      default: return '#ffffff'; // blanc par défaut
    }
  }

  // Calcul du total de trophées par années
  calculateTotal(statsTrophees: StatsTrophees): number {
    return statsTrophees.nbPlatine + statsTrophees.nbOr + statsTrophees.nbArgent + statsTrophees.nbBronze;
  }

  // Changer la vue active
  changerVue(type: 'trophees' | 'niveaux') {
    this.vueActive = type;
  }

}
