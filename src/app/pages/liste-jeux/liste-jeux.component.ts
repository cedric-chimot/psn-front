import { Component, OnInit } from '@angular/core';
import { JeuxPlateforme } from '../../models/JeuxPlateforme';
import { Jeux } from '../../models/Jeux';
import { Plateforme } from '../../models/Plateforme';
import { JeuxPlateformeService } from '../../services/jeuxPlateforme/jeux-plateforme.service';
import { PlateformeService } from '../../services/plateforme/plateforme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JeuxService } from '../../services/jeux/jeux.service';

@Component({
  selector: 'app-liste-jeux',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './liste-jeux.component.html',
  styleUrls: ['./liste-jeux.component.css']
})
export class ListeJeuxComponent implements OnInit {
  jeuxPlateformes: JeuxPlateforme[] = [];
  jeux: Jeux[] = [];
  plateformes: Plateforme[] = [];

  constructor(
    private jpService: JeuxPlateformeService,
    private jeuxService: JeuxService,
    private plateformeService: PlateformeService
  ) {}

  ngOnInit(): void {
    this.jpService.getAllJeuxPlateforme().subscribe({
      next: (data) => this.jeuxPlateformes = data,
      error: (err) => console.error('Erreur JP', err)
    });

    this.jeuxService.getAllJeux().subscribe({
      next: (data: Jeux[]) => this.jeux = data,
      error: (err: any) => console.error('Erreur Jeux', err)
    });

    this.plateformeService.getAllPlateformes().subscribe({
      next: (data) => this.plateformes = data,
      error: (err) => console.error('Erreur Plateformes', err)
    });
    console.log(this.jeuxPlateformes);
  }

  getNomJeu(id: number): string {
    return this.jeux.find(j => j.id === id)?.jeu || '???';
  }

  getNomPlateforme(id: number): string {
    return this.plateformes.find(p => p.id === id)?.plateforme || '???';
  }
}
