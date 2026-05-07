export interface Livre {
  id?: string; // optionnel : non défini lors de la création
  titre: string;
  auteur: string;
  annee: number;
  disponible: boolean;
}
