import { Plateforme } from "./Plateforme";

export class Jeux {
  constructor(
    public id: number,
    public jeu: string,
    public plateforme: Plateforme,
    public nbPlatine: number,
    public nbOr: number,
    public nbArgent: number,
    public nbBronze: number,
    public nbHeures: number,
  ) {}
}
