import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  text: string = "";
  returnUrl: string;
  entered_login:string;
  entered_password:string;


  constructor(fb: FormBuilder, private messageservice: MessageService, private router: Router,private authServ:AuthService) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  login() {
    let user = Array();

    console.log("login : ",this.entered_login,", password: ",this.entered_password)
    
    let credentials={
      login: this.entered_login,
      password: this.entered_password
    }
    console.log(credentials);
    this.messageservice.sendMessage(environment.AUTHSERVER, 'api/v1/users/login', credentials ).subscribe(
      (response) => {
        user = response.data;
        console.log(response);
        if (response.success) {
          this.router.navigate(["/liste_utilisateur"]);
          
          this.authServ.idPersonne = response.data[0].id_personnes;
          this.authServ.idUser = response.data[0].id_users;
          this.authServ.roleUser = response.data[0].roleuser;
          this.authServ.storeInfo();

        } else {
          console.log("no");
          this.text = "Mail ou mot de passe incorrect."
        }
      }
    );
  }

  ngOnInit(): void { }
}