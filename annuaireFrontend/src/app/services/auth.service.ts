import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  idUser: number = Number(sessionStorage.getItem("idUser"));
  idPersonne: number = Number(sessionStorage.getItem("idPersonne"));
  roleUser : string | null = sessionStorage.getItem("roleUser");

  storeInfo():void{
    sessionStorage.setItem("iduser", this.idUser.toString());
    sessionStorage.setItem("idPersonne", this.idPersonne.toString());
    sessionStorage.setItem("roleUser", (this.roleUser || '').toString());
  }

  logOut(): void {
    sessionStorage.clear();
  }

  constructor() { }
}
