import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BackendData {
  success: string ;
  data: any ;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

  sendMessage(serveur:string ,service:string, data:any): Observable<BackendData> {
    const url = serveur +'/'+ service ;
    
    return this.http.post<BackendData>(
      url,
      data
    );
  }

}

// Exemple d'appel pour récupérer toute les personnes dans la BDD 
// pour la route éviter de mettre le / au début il est déjà ajouté par le service
/*
this.messageservice.sendMessage(environment.BACKENDSERVER,'api/backend/getAllPersonnes',undefined).subscribe(
      (response)=>{
        console.log(response)
      }
    ) ;
*/