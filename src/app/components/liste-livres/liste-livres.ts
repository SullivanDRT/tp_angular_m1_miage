import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Livre } from '../../models/livre.model';

@Component({
  selector: 'app-liste-livres',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './liste-livres.html',
  styleUrls: ['./liste-livres.css']
})
export class ListeLivres {
  livres: Livre[] = [
    { id: 1, titre: 'Clean Code', auteur: 'Robert C. Martin', annee: 2008, disponible: true },
    { id: 2, titre: 'The Pragmatic Programmer', auteur: 'David Thomas', annee: 1999, disponible: true },
    { id: 3, titre: 'Design Patterns', auteur: 'Gang of Four', annee: 1994, disponible: false }
  ];
}
