import { Routes } from '@angular/router';
import { ListeLivres } from './components/liste-livres/liste-livres';
import { DetailLivre } from './components/detail-livre/detail-livre';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'livres', pathMatch: 'full' },
  { path: 'livres', component: ListeLivres },
  { path: 'livres/:id', component: DetailLivre },
  {
    path: 'ajouter',
    loadComponent: () =>
      import('./components/formulaire-livre/formulaire-livre')
        .then(m => m.FormulaireLivre),
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard]
  },
  {
    path: 'modifier/:id',
    loadComponent: () =>
      import('./components/formulaire-livre/formulaire-livre')
        .then(m => m.FormulaireLivre),
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard]
  },
  { path: '**', redirectTo: 'livres' }
];
