export class JeuxPlateforme {
  id: number;
  idJeu: number;
  idPlateforme: number;

  constructor(id: number, idJeu: number, idPlateforme: number) {
    this.id = id;
    this.idJeu = idJeu;
    this.idPlateforme = idPlateforme;
  }
}
