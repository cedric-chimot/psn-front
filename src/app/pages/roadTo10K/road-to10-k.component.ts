import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoutonsNavigationComponent } from "../../components/commons/boutons-navigation/boutons-navigation.component";

interface Jeu {
  id: string; // identifiant unique pour le localStorage
  nom: string;
  heures: number;
  platine: number;
  or: number;
  argent: number;
  bronze: number;
  total: number;
  fait: boolean;
}

@Component({
  selector: 'app-road-to10-k',
  standalone: true,
  imports: [CommonModule, RouterModule, BoutonsNavigationComponent],
  templateUrl: './road-to10-k.component.html',
  styleUrls: ['./road-to10-k.component.css']
})
export class RoadTo10KComponent implements OnInit {
  objectif = 10000;

  // Objectif de niveau fixe
  niveauObjectifFixe = {
    niveau: 609,
    platine: 353,
    or: 2702,
    argent: 2243,
    bronze: 4702,
    total: 10000
  };

  // Niveau actuel basé sur les données fournies
  niveauActuel = {
    niveau: 607,
    platine: 349,
    or: 2684,
    argent: 2212,
    bronze: 4602,
    total: 9847
  };

  // Liste de jeux à faire avec leurs données
  jeuxDisponibles: Jeu[] = [
    { id: 'expedition33', nom: 'Clair Obscur : Expedition 33, PS5', heures: 60, platine: 1, or: 2, argent: 5, bronze: 48, total: 56, fait: false },
    { id: 'banishers', nom: 'Banishers, PS5', heures: 40, platine: 1, or: 3, argent: 9, bronze: 30, total: 43, fait: false },
    { id: 'splitfiction', nom: 'Split Fiction, PS5', heures: 15, platine: 1, or: 8, argent: 5, bronze: 7, total: 21, fait: false },
    { id: 'beyondsteel', nom: 'Beyond a Steel Sky, PS5', heures: 10, platine: 1, or: 5, argent: 12, bronze: 15, total: 33, fait: false },
  ];

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('jeux-faits');
      if (saved) {
        const faits = JSON.parse(saved);
        this.jeuxDisponibles.forEach(jeu => {
          jeu.fait = faits[jeu.id] ?? false;
        });
      }
    }
  }

  // Méthode pour basculer l'état "fait" d'un jeu
  toggleFait(jeu: Jeu): void {
    jeu.fait = !jeu.fait;
    this.saveFaits();
  }

  // Méthode pour sauvegarder l'état des jeux dans le localStorage
  saveFaits(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const faits: Record<string, boolean> = {};
      this.jeuxDisponibles.forEach(j => faits[j.id] = j.fait);
      localStorage.setItem('jeux-faits', JSON.stringify(faits));
    }
  }

  // Méthode pour obtenir le total actuel de trophées
  get totalActuel(): number {
    // On compte le total des jeux faits
    const totalJeuxFaits = this.jeuxDisponibles
      .filter(j => j.fait)
      .reduce((acc, j) => acc + j.total, 0);

    // On ajoute au total actuel de départ (niveauActuel.total)
    return this.niveauActuel.total + totalJeuxFaits;
  }

  // Méthode pour réinitialiser l'état des jeux
  get jeuxRestants(): Jeu[] {
    return this.jeuxDisponibles.filter(j => !j.fait);
  }

  // Méthodes pour calculer les totaux des jeux restants
  get totalHeures(): number {
    return this.jeuxRestants.reduce((acc, j) => acc + j.heures, 0);
  }

  get totalPlatine(): number {
    return this.jeuxRestants.reduce((acc, j) => acc + j.platine, 0);
  }

  get totalOr(): number {
    return this.jeuxRestants.reduce((acc, j) => acc + j.or, 0);
  }

  get totalArgent(): number {
    return this.jeuxRestants.reduce((acc, j) => acc + j.argent, 0);
  }

  get totalBronze(): number {
    return this.jeuxRestants.reduce((acc, j) => acc + j.bronze, 0);
  }

  get totalGeneral(): number {
    return this.jeuxRestants.reduce((acc, j) => acc + j.total, 0);
  }

  // Méthodes pour obtenir les niveaux potentiels
  get niveauPotentielPlatine(): number {
    return this.niveauActuel.platine + this.totalPlatine;
  }

  get niveauPotentielOr(): number {
    return this.niveauActuel.or + this.totalOr;
  }

  get niveauPotentielArgent(): number {
    return this.niveauActuel.argent + this.totalArgent;
  }

  get niveauPotentielBronze(): number {
    return this.niveauActuel.bronze + this.totalBronze;
  }

  get niveauPotentielTotal(): number {
    return this.niveauActuel.total + this.totalGeneral;
  }

  // Méthode pour obtenir les niveaux restants pour atteindre l'objectif
  get objectifRestant(): number {
    return this.objectif - this.totalActuel;
  }

}
