import { Annee } from "./Annee";

export class StatsNiveaux {
  constructor(
    public id: number,
    public niveau: number,
    public niveauAnnee: Annee) {}
}
