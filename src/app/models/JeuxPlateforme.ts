import { Jeux } from "./Jeux";
import { Plateforme } from "./Plateforme";

export class JeuxPlateforme {
  constructor(
    public id: number,
    public idJeu: Jeux,
    public idPlateforme: Plateforme,
    public nbPLatine: number,
    public nbOr: number,
    public nbArgent: number,
    public nbBronze: number
  ) {}
}
