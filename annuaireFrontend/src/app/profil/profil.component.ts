import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

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

  constructor(private authserv: AuthService, private message: MessageService) { }

  ngOnInit(): void {
    console.log(this.authserv.idPersonne);
    let infoUser = {
      idPers: this.authserv.idPersonne
    }
    this.message.sendMessage(environment.BACKENDSERVER, "api/v1/personnes/getPersonneByID",infoUser).subscribe(
      (reponse)=>{
        console.log(reponse);
        if (reponse.success) {
          this.Adresse = reponse.data[0].adresse;
          this.Code_postal = reponse.data[0].code_postal;
          this.Mail = reponse.data[0].email ;
          this.Nom = reponse.data[0].nom ;
          this.Prenom = reponse.data[0].prenom ;
          this.Tel = reponse.data[0].tel ;
          this.Ville = reponse.data[0].ville ;
        }
      }
    )
  }

  deconnexion(): void {
    this.authserv.logOut();
  }
}