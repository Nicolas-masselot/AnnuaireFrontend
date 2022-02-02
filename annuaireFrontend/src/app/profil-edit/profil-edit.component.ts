import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.scss'] ,

})
export class ProfilEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }

}
