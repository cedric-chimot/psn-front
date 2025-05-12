import { Component } from '@angular/core';
import { JeuxPlateforme } from '../../models/JeuxPlateforme';
import { JeuxPlateformeService } from '../../services/jeuxPlateforme/jeux-plateforme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-liste-jeux',
  imports: [CommonModule, RouterModule],
  templateUrl: './liste-jeux.component.html',
  styleUrls: ['./liste-jeux.component.css']
})
export class ListeJeuxComponent {
  jeuxPlateformes: JeuxPlateforme[] = [];

  constructor(private jpService: JeuxPlateformeService) {}

  ngOnInit(): void {
    this.jpService.getAll().subscribe({
      next: (data) => {
        this.jeuxPlateformes = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement', err);
      }
    });
  }
}
