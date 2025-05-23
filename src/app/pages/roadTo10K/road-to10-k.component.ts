import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoutonsNavigationComponent } from "../../components/commons/boutons-navigation/boutons-navigation.component";

interface Jeu {
  nom: string;
  heures: number;
  platine: number;
  or: number;
  argent: number;
  bronze: number;
  total: number;
}

@Component({
  selector: 'app-road-to10-k',
  standalone: true,
  imports: [CommonModule, RouterModule, BoutonsNavigationComponent],
  templateUrl: './road-to10-k.component.html',
  styleUrls: ['./road-to10-k.component.css']
})
export class RoadTo10KComponent {
  totalActuel = 9799;
  objectif = 10000;

  niveauActuel = {
    niveau: 605,
    platine: 345,
    or: 2640,
    argent: 2212,
    bronze: 4602,
    total: 9799
  };

  jeuxDisponibles: Jeu[] = [
    { nom: 'Goldorak, PS5', heures: 8, platine: 1, or: 5, argent: 13, bronze: 12, total: 31 },
    { nom: 'Space Kabam, PS4/PS5', heures: 1, platine: 2, or: 22, argent: 0, bronze: 0, total: 24 },
    { nom: 'Clair Obscur : Expedition 33, PS5', heures: 60, platine: 1, or: 2, argent: 5, bronze: 48, total: 56 },
    { nom: 'Split Fiction, PS5', heures: 15, platine: 1, or: 8, argent: 5, bronze: 7, total: 21 },
    { nom: 'Jusant, PS5', heures: 8, platine: 1, or: 7, argent: 8, bronze: 6, total: 22 },
    { nom: 'Ratchet et Clank, PS5', heures: 10, platine: 1, or: 3, argent: 7, bronze: 36, total: 47 }
  ];

  // Calculs totaux
  get totalHeures(): number {
    return this.jeuxDisponibles.reduce((acc, j) => acc + j.heures, 0);
  }

  get totalPlatine(): number {
    return this.jeuxDisponibles.reduce((acc, j) => acc + j.platine, 0);
  }

  get totalOr(): number {
    return this.jeuxDisponibles.reduce((acc, j) => acc + j.or, 0);
  }

  get totalArgent(): number {
    return this.jeuxDisponibles.reduce((acc, j) => acc + j.argent, 0);
  }

  get totalBronze(): number {
    return this.jeuxDisponibles.reduce((acc, j) => acc + j.bronze, 0);
  }

  get totalGeneral(): number {
    return this.jeuxDisponibles.reduce((acc, j) => acc + j.total, 0);
  }

  // Calculs trophées potentiels
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

  // Calculs objectifs restants
  get objectifRestant(): number {
    return this.objectif - this.niveauActuel.total;
  }

}
