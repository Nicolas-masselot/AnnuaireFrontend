import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  nom:string;
  prenom:string;
  mail:string;
  adresse:string;
  tel:string;
  code_postal:string;
  ville:string;
  password:string;

  ErrorMessage:string = "";

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(fb: FormBuilder, private messageservice: MessageService, private router:Router, private authServ: AuthService) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }
  
  ngOnInit(): void {}

  register() {
    
    let credentials={
      login: this.mail,
      password: this.password,
      role: "user"
    }
    console.log(credentials)
    this.messageservice.sendMessage(environment.AUTHSERVER, 'api/v1/users/register', credentials ).subscribe(
      (response) => {
        console.log(response);
        if (response.success) {
          this.authServ.idPersonne = response.data[0].id_personnes;
          this.authServ.idUser = response.data[0].id_users;
          this.authServ.roleUser = response.data[0].roleuser;
          this.authServ.storeInfo();
          let userData = {
            idPers: response.data[0].id_personnes,
            adresse:this.adresse,
            codepostal:this.code_postal,
            email:this.mail,
            nom:this.nom,
            prenom:this.prenom,
            tel:this.tel,
            ville:this.ville 
          }
    
          this.messageservice.sendMessage(environment.BACKENDSERVER, "api/v1/personnes/AddPersonne",userData).subscribe(
            (reponse)=>{
              console.log(reponse);
              if (reponse.success) {
                this.router.navigate(["/liste_utilisateur"]);
              }else {
                if (reponse.errorSet[0] === "INVALID_PARAMETERS") {
                  this.ErrorMessage = "Données invalides" ;
                } else {
                  this.ErrorMessage = "erreur coté serveur" ;
                }
                
              }
            }
          )
        } else {
          if (response.errorSet[0] === "INVALID_PARAMETERS") {
            this.ErrorMessage = "Données invalides" ;
          } else if (response.errorSet[0] === "USER_EXIST") {
            this.ErrorMessage = "utilisateur déjà existant" ;
          } else if (response.errorSet[0] === "INVALID_EMAIL") {
            this.ErrorMessage = "adresse mail invalide" ;
          }
          
        }
      }
    );
    
  }
}