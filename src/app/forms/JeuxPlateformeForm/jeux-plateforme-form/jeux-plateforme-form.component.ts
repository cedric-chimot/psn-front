import { Plateforme } from './../../../models/Plateforme';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JeuxService } from '../../../services/jeux/jeux.service';
import { PlateformeService } from '../../../services/plateforme/plateforme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Jeux } from '../../../models/Jeux';

@Component({
  selector: 'app-jeux-plateforme-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './jeux-plateforme-form.component.html',
  styleUrls: ['./jeux-plateforme-form.component.css']
})
export class JeuxPlateformeFormComponent implements OnInit {

  plateformes: Plateforme[] = [];
  submitted = false;
  successMessage = '';
  errorMessage = '';

  jeu: Partial<Jeux> = {
    jeu: '',
    plateforme: {} as Plateforme,
    nbPlatine: 0,
    nbOr: 0,
    nbArgent: 0,
    nbBronze: 0,
    nbHeures: 0
  };
  
  // Événement pour fermer le modal
  @Output() close = new EventEmitter<void>();

  constructor(
    private jeuxService: JeuxService,
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

    if (this.jeu.jeu && this.jeu.plateforme && this.jeu.plateforme.id) {
      const selectedPlateforme = this.plateformes.find(
        (plateforme) => plateforme.id === this.jeu.plateforme!.id
      );

      if (!selectedPlateforme) {
        this.errorMessage = 'Plateforme invalide.';
        this.successMessage = '';
        return;
      }

      const newJeu: Jeux = {
        id: 0,
        jeu: this.jeu.jeu!,
        plateforme: selectedPlateforme,
        nbPlatine: this.jeu.nbPlatine!,
        nbOr: this.jeu.nbOr!,
        nbArgent: this.jeu.nbArgent!,
        nbBronze: this.jeu.nbBronze!,
        nbHeures: this.jeu.nbHeures!
      };

      this.errorMessage = '';
      this.jeuxService.createJeu(newJeu).subscribe({
        next: () => {
          this.successMessage = 'Jeu ajouté avec succès !';
          this.jeu = {
            jeu: '',
            plateforme: {} as Plateforme,
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
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      this.successMessage = '';
    }
  }

  // Méthode pour fermer le modal
  closeModal() {
    this.close.emit(); // Envoie un signal au parent pour fermer le modal
  }
}
