import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';

export interface UserData {
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  adresse: string;
  code_postal: string;
  ville: string;
}

/** Constants used to fill up our data base. */
const VILLES: string[] = [
  'Paris',
  'Lyon',
  'Marseille',
  'La Zone'
];

const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisateurs.component.html',
  styleUrls: ['./liste-utilisateurs.component.scss']
})
export class ListeUtilisateursComponent implements AfterViewInit {
  displayedColumns: string[] = ['nom', 'prenom', 'tel', 'mail', 'adresse', 'code_postal', 'ville'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // messageservice: MessageService;

  constructor(private messageservice: MessageService) {
    // Create 100 users
    const users = Array();

    // Assign the data to the data source for the table to render
    this.messageservice.sendMessage(environment.BACKENDSERVER, 'api/v1/personnes/getAllPersonnes', undefined).subscribe(
      (response) => {
        for (var i = 0; i < response.data.length; i++) {
          users[i] = response.data[i];
        }
      }
    );

    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const nom =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))]
  const prenom =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))]

  return {
    nom: nom,
    prenom: prenom,
    tel: "06" + Math.round(Math.random() * 99999999).toString(),
    email: nom + prenom + "@mail.fr",
    adresse: "25 rue du random",
    code_postal: Math.round(Math.random() * 99999).toString(),
    ville: VILLES[Math.round(Math.random() * (VILLES.length - 1))]
  };
}