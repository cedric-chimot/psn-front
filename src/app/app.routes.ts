import { Routes } from '@angular/router';
import { ListeJeuxComponent } from './pages/liste-jeux/liste-jeux.component';
import { JeuxPlateformeFormComponent } from './forms/JeuxPlateformeForm/jeux-plateforme-form/jeux-plateforme-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListeJeuxComponent },
  { path: 'ajout-form', component: JeuxPlateformeFormComponent },
];
