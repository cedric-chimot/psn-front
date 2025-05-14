import { Jeux } from "./Jeux";
import { Plateforme } from "./Plateforme";

export class JeuxPlateforme {
  constructor(
    public id: number,
    public jeu: Jeux,
    public plateforme: Plateforme,
    public nbPlatine: number,
    public nbOr: number,
    public nbArgent: number,
    public nbBronze: number,
    public nbHeures: number,
  ) {}
}
