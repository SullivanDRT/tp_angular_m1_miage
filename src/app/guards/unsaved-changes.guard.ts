import { CanDeactivateFn } from '@angular/router';
import { FormulaireLivre } from '../components/formulaire-livre/formulaire-livre';

export const unsavedChangesGuard: CanDeactivateFn<FormulaireLivre> = (component) => {
  if (component.formModifie()) {
    return confirm('Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?');
  }
  return true;
};

