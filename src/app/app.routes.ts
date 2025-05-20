import { Routes } from '@angular/router';
import { ListeJeuxComponent } from './pages/liste-jeux/liste-jeux.component';
import { JeuxPlateformeFormComponent } from './forms/JeuxPlateformeForm/jeux-plateforme-form/jeux-plateforme-form.component';
import { StatsComponent } from './pages/stats/stats.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListeJeuxComponent },
  { path: 'ajout-form', component: JeuxPlateformeFormComponent },
  { path: 'stats', component: StatsComponent },
];
