import { Component, OnInit } from '@angular/core';
import { Plateforme } from '../../../models/Plateforme';
import { JeuxPlateformeService } from '../../../services/jeuxPlateforme/jeux-plateforme.service';
import { PlateformeService } from '../../../services/plateforme/plateforme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-jeux-plateforme-form',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './jeux-plateforme-form.component.html',
  styleUrls: ['./jeux-plateforme-form.component.css']
})
export class JeuxPlateformeFormComponent implements OnInit {

  jeuPlateformeForm!: FormGroup;
  plateformes: Plateforme[] = [];
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private jeuxPlateformeService: JeuxPlateformeService,
    private plateformeService: PlateformeService
  ) {}

  ngOnInit(): void {
    this.jeuPlateformeForm = this.fb.group({
      jeu: this.fb.group({
        id: [null],
        jeu: ['', Validators.required]
      }),
      idPlateforme: [null, Validators.required],
      nbPlatine: [0, [Validators.required, Validators.min(0)]],
      nbOr: [0, [Validators.required, Validators.min(0)]],
      nbArgent: [0, [Validators.required, Validators.min(0)]],
      nbBronze: [0, [Validators.required, Validators.min(0)]],
      nbHeures: [0, [Validators.required, Validators.min(0)]],
    });

    // Récupération des plateformes pour le select
    this.plateformeService.getAllPlateformes().subscribe({
      next: (data: Plateforme[]) => this.plateformes = data,
      error: (err: any) => console.error('Erreur chargement plateformes', err)
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.jeuPlateformeForm.invalid) {
      this.errorMessage = 'Merci de remplir correctement le formulaire.';
      return;
    }
    this.errorMessage = '';
    this.jeuxPlateformeService.createJeuxPlateforme(this.jeuPlateformeForm.value)
      .subscribe({
        next: () => {
          this.successMessage = 'Jeu avec plateforme ajouté avec succès !';
          this.jeuPlateformeForm.reset({
            jeu: { id: null, jeu: '' },
            idPlateforme: null,
            nbPlatine: 0,
            nbOr: 0,
            nbArgent: 0,
            nbBronze: 0,
            nbHeures: 0
          });
          this.submitted = false;
        },
        error: (err: { message: string; }) => {
          this.errorMessage = 'Erreur lors de l\'ajout : ' + err.message;
          this.successMessage = '';
        }
      });
  }
}
