import { Annee } from "./Annee";

export class StatsNiveaux {
  id: number;
  niveau: number;
  idAnnee: Annee;

  constructor(id: number, niveau: number, idAnnee: Annee) {
    this.id = id;
    this.niveau = niveau;
    this.idAnnee = idAnnee;
  }
}
