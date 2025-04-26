export class JeuxPlateforme {
  id: number;
  idJeu: number;
  idPlateforme: number;
  nbPLatine: number;
  nbOr: number;
  nbArgent: number;
  nbBronze: number;

  constructor(id: number, idJeu: number, idPlateforme: number, nbPLatine: number, nbOr: number, nbArgent: number, nbBronze: number) {
    this.nbPLatine = nbPLatine;
    this.nbOr = nbOr;
    this.nbArgent = nbArgent;
    this.nbBronze = nbBronze;
    this.id = id;
    this.idJeu = idJeu;
    this.idPlateforme = idPlateforme;
  }
}
