import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Livre } from '../../models/livre.model';
import { LivreService } from '../../services/livre.service';
import { DepuisAnneePipe } from '../../pipes/depuis-annee.pipe';


@Component({
  selector: 'app-liste-livres',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, DepuisAnneePipe],
  templateUrl: './liste-livres.html',
  styleUrls: ['./liste-livres.css']
})
export class ListeLivres implements OnInit {
  livres: Livre[] = [];
  isLoading: boolean = true;
  erreur: string = '';
  recherche: string = '';
  filtreDispo: string = 'tous';
  tri: string = 'titre-asc';
  page: number = 1;
  parPage: number = 5;

  @Output() nombreLivres = new EventEmitter<number>();

  constructor(
    private livreService: LivreService,
    private cdr: ChangeDetectorRef
  ) {}

  get livresFiltres(): Livre[] {
    const terme = this.recherche.toLowerCase();
    const filtres = this.livres.filter(l =>
      (l.titre.toLowerCase().includes(terme) ||
      l.auteur.toLowerCase().includes(terme)) &&
      (this.filtreDispo === 'tous' ||
       (this.filtreDispo === 'disponibles' && l.disponible) ||
       (this.filtreDispo === 'indisponibles' && !l.disponible))
    );
    return filtres.sort((a, b) => {
      switch (this.tri) {
        case 'titre-asc': return a.titre.localeCompare(b.titre);
        case 'titre-desc': return b.titre.localeCompare(a.titre);
        case 'annee-asc': return a.annee - b.annee;
        case 'annee-desc': return b.annee - a.annee;
        default: return 0;
      }
    });
  }

  get livresPagines(): Livre[] {
    const debut = (this.page - 1) * this.parPage;
    return this.livresFiltres.slice(debut, debut + this.parPage);
  }

  get totalPages(): number {
    return Math.ceil(this.livresFiltres.length / this.parPage);
  }

  pagePrecedente(): void {
    if (this.page > 1) this.page--;
  }

  pageSuivante(): void {
    if (this.page < this.totalPages) this.page++;
  }

  ngOnInit(): void {
    this.livreService.getLivres().subscribe({
      next: (data) => {
        this.livres = data;
        this.nombreLivres.emit(this.livres.length);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.erreur = 'Impossible de charger les livres. Vérifiez que json-server est démarré.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  supprimerLivre(id: string): void {
    if (confirm('Supprimer ce livre définitivement ?')) {
      this.livreService.supprimerLivre(id).subscribe(() => {
        this.livres = this.livres.filter(l => l.id !== id);
        this.nombreLivres.emit(this.livres.length);
        this.cdr.detectChanges();
      });
    }
  }
}
