import { Component, OnInit } from '@angular/core';
import { Plateforme } from '../../../models/Plateforme';
import { JeuxPlateformeService } from '../../../services/jeuxPlateforme/jeux-plateforme.service';
import { PlateformeService } from '../../../services/plateforme/plateforme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jeux-plateforme-form',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './jeux-plateforme-form.component.html',
  styleUrls: ['./jeux-plateforme-form.component.css']
})
export class JeuxPlateformeFormComponent implements OnInit {

  plateformes: Plateforme[] = [];
  submitted = false;
  successMessage = '';
  errorMessage = '';

  jeuPlateforme: any = {
    jeu: { id: null, jeu: '' },
    plateforme: { id: null },
    nbPlatine: 0,
    nbOr: 0,
    nbArgent: 0,
    nbBronze: 0,
    nbHeures: 0
  };

  constructor(
    private jeuxPlateformeService: JeuxPlateformeService,
    private plateformeService: PlateformeService
  ) {}

  ngOnInit(): void {
    this.plateformeService.getAllPlateformes().subscribe({
      next: (data) => this.plateformes = data,
      error: (err) => console.error('Erreur chargement plateformes', err)
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (!this.jeuPlateforme.jeu.jeu || !this.jeuPlateforme.plateforme.id) {
      this.errorMessage = 'Merci de remplir les champs obligatoires.';
      return;
    }

    this.errorMessage = '';
    this.jeuxPlateformeService.createJeuxPlateforme(this.jeuPlateforme).subscribe({
      next: () => {
        this.successMessage = 'Jeu ajouté avec succès !';
        this.jeuPlateforme = {
          jeu: { id: null, jeu: '' },
          plateforme: { id: null },
          nbPlatine: 0,
          nbOr: 0,
          nbArgent: 0,
          nbBronze: 0,
          nbHeures: 0
        };
        this.submitted = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur : ' + err.message;
        this.successMessage = '';
      }
    });
  }
}
