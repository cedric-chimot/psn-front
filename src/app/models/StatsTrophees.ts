import { Annee } from "./Annee";

export class StatsTrophees {
  id: number;
  nbPLatine: number;
  nbOr: number;
  nbArgent: number;
  nbBronze: number;
  idAnnee: Annee;

  constructor(
    id: number,
    nbPLatine: number,
    nbOr: number,
    nbArgent: number,
    nbBronze: number,
    idAnnee: Annee
  ) {
    this.id = id;
    this.nbPLatine = nbPLatine;
    this.nbOr = nbOr;
    this.nbArgent = nbArgent;
    this.nbBronze = nbBronze;
    this.idAnnee = idAnnee;
  }
}
