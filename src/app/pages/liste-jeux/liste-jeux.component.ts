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
import { JeuxPlateformeFormComponent } from "../../forms/JeuxPlateformeForm/jeux-plateforme-form/jeux-plateforme-form.component";
import { BoutonsNavigationComponent } from "../../components/commons/boutons-navigation/boutons-navigation.component";

@Component({
  selector: 'app-liste-jeux',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PaginationComponent, JeuxPlateformeFormComponent, BoutonsNavigationComponent],
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
  isAddModalOpen = false;
  isJeuModalOpen = false;
  isDeleteModalOpen = false;

  selectedJeuForEdit: Jeux | null = null;
  selectedJeuForDelete: Jeux | null = null;

  constructor(
    private jeuxService: JeuxService,
    private plateformeService: PlateformeService,
    private statsNiveauxService: StatsNiveauxService,
    private statsTropheesService: StatsTropheesService
  ) {}

  ngOnInit(): void {
    this.loadJeux();
    this.loadPlateformes();
    this.loadNiveauActuel();
    this.loadTropheesActuels();
  }

  // Méthode pour charger tous les jeux
  loadJeux(): void {
    this.jeuxService.getAllJeux().subscribe({
      next: (data: Jeux[]) => {
        this.allJeuxList = data;
        this.updatePage();
      },
      error: (err: any) => console.error('Erreur lors du chargement des jeux', err)
    });
  }

  // Méthode pour charger toutes les plateformes
  loadPlateformes(): void {
    this.plateformeService.getAllPlateformes().subscribe({
      next: (data) => this.plateformes = data,
      error: (err) => console.error('Erreur lors du chargement des plateformes', err)
    });
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

  // Méthode pour ouvrir le modal d'ajout
  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  // Méthode pour ouvrir le modal jeux
  openJeuModal(jeu: Jeux): void {
    this.selectedJeuForEdit = { ...jeu } as Jeux;
    this.isJeuModalOpen = true;  // ça ouvre le modal
  }

  // Méthode pour ouvrir le modal de suppression
  openDeleteModal(jeu: Jeux): void {
    this.selectedJeuForDelete = { ...jeu } as unknown as Jeux;  // Copie complète pour la suppression
    this.isDeleteModalOpen = true;  // Ouvre le modal de suppression
  }

  // Méthode pour mettre à jour une pokeball
  updateJeu(): void {
    if (this.selectedJeuForEdit) {
      // Création d'un objet qui ne contiendra que les champs modifiés
      const updatedJeu: any = {
        id: this.selectedJeuForEdit.id,
        jeu: this.selectedJeuForEdit.jeu,
        plateforme: { id: this.selectedJeuForEdit.plateforme.id }, // Utilisation de l'ID seulement
        nbPlatine: this.selectedJeuForEdit.nbPlatine,
        nbOr: this.selectedJeuForEdit.nbOr,
        nbArgent: this.selectedJeuForEdit.nbArgent,
        nbBronze: this.selectedJeuForEdit.nbBronze,
        nbHeures: this.selectedJeuForEdit.nbHeures
      };

      this.jeuxService.updateJeu(updatedJeu).subscribe({
        next: () => {
          this.loadJeux(); // Rafraîchit les données après mise à jour
          this.closeModal();
        },
        error: (err) => console.error('Erreur lors de la mise à jour du jeu:', err),
      });
    }
  }

  // Supprimer un jeu par son ID
  deleteJeu(): void {
    if (this.selectedJeuForDelete && this.selectedJeuForDelete.id) {
      this.jeuxService.deleteJeuById(this.selectedJeuForDelete.id).subscribe({
        next: () => {
          this.loadJeux();  // Recharger la liste après suppression
          this.closeModal();  // Fermer le modal après la suppression
        },
        error: (err) => console.error('Erreur lors de la suppression du jeu:', err)
      });
    } else {
      console.error('Aucun Jeu sélectionné pour suppression');
    }
  }

  // Méthode pour rafraîchir la liste des jeux après ajout
  refresh(): void {
    this.jeuxService.getAllJeux().subscribe({
      next: (data: Jeux[]) => {
        this.allJeuxList = data;
        this.updatePage();
      },
      error: (err: any) => console.error('Erreur lors du rafraîchissement des jeux', err)
    });
  }

  // Fermer le modal
  closeModal(): void {
    this.isAddModalOpen = false;
    this.isJeuModalOpen = false;
    this.isDeleteModalOpen = false;
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
