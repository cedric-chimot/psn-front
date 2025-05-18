import { Annee } from "./Annee";

export class StatsTrophees {
  constructor(
    public id: number,
    public nbPlatine: number,
    public nbOr: number,
    public nbArgent: number,
    public nbBronze: number,
    public tropheeAnnee: Annee
  ) {}
}
