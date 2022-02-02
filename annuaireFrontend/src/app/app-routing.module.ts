import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import { ProfilComponent } from './profil/profil.component';
import { ProfilEditComponent } from './profil-edit/profil-edit.component';

const routes: Routes = [
  { path: '',   redirectTo: '/connexion', pathMatch: 'full' },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'liste_utilisateur', component: ListeUtilisateursComponent },
  { path: 'profil', component: ProfilComponent },
  {path: 'profilE', component: ProfilEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
