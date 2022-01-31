import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  Nom:string="B Goode";
  Prenom:string="Johnny";
  Tel:string="06 12 34 56 78";
  Mail:string="azerty@mail.fr";
  Adresse:string="5 rue de la Hess";
  Code_postal:string="75001";
  Ville:string="Paris";

  constructor() { }

  ngOnInit(): void {}
}