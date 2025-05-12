import { Routes } from '@angular/router';
import { ListeJeuxComponent } from './pages/liste-jeux/liste-jeux.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListeJeuxComponent },];
