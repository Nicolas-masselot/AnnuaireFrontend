import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.scss'] ,

})
export class ProfilEditComponent implements OnInit {

  Nom:string="B Goode";
  Prenom:string="Johnny";
  Tel:string="06 12 34 56 78";
  Mail:string="azerty@mail.fr";
  Adresse:string="5 rue de la Hess";
  Code_postal:string="75001";
  Ville:string="Paris";

  ErrorText = "";

  constructor(private authserv:AuthService,private message: MessageService, private router: Router) { }


  ngOnInit(): void {
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

  modify():void {
    
    if (this.Adresse == "" || this.Code_postal == "" || this.Mail == "" || this.Nom == "" || this.Prenom == "" || this.Tel == "" || this.Ville == "" ) {
      this.ErrorText = "Veuillez remplir tous les champs" ;
    } else {
      this.ErrorText = "" ;
    }
    if (this.ErrorText === "") {
      console.log("modif");
      let userData = {
        idPers: this.authserv.idPersonne,
        adresse:this.Adresse,
        codepostal:this.Code_postal,
        email:this.Mail,
        nom:this.Nom,
        prenom:this.Prenom,
        tel:this.Tel,
        ville:this.Ville 
      }

      this.message.sendMessage(environment.BACKENDSERVER, "api/v1/personnes/ModifyPersonne",userData).subscribe(
        (reponse)=>{
          console.log(reponse);
          if (reponse.success) {
            this.router.navigate(["/profil"]);
          }else {
            this.ErrorText = "Erreur coté serveur";
          }
        }
      )

      
    }
  }

  deconnexion(): void {
    this.authserv.logOut();
  }

}
