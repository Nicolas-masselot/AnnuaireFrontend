import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


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

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(fb: FormBuilder, private messageservice: MessageService, private router:Router) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }
  
  ngOnInit(): void {}

  register() {
    let user = Array();
    
    let credentials={
      login: this.mail,
      password: this.password,
      role: "user"
    }
    console.log(credentials)
    this.messageservice.sendMessage(environment.AUTHSERVER, 'api/v1/users/register', credentials ).subscribe(
      (response) => {
        user = response.data;
        console.log(response);
        if (response.success) {
          this.router.navigate(["/liste_utilisateur"]);
        } else {
          console.log("no");
        }
      }
    );
  }
}