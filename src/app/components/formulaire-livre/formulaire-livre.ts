import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LivreService } from '../../services/livre.service';
import { Livre } from '../../models/livre.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-formulaire-livre',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './formulaire-livre.html',
  styleUrl: './formulaire-livre.css',
})
export class FormulaireLivre implements OnInit {
  livreForm!: FormGroup;
  isModification: boolean = false;
  livreId: string | null = null;
  sauvegarde: boolean = false;

  constructor(
    private fb: FormBuilder,
    private livreService: LivreService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  formModifie(): boolean {
    return this.livreForm?.dirty && !this.sauvegarde;
  }

  ngOnInit(): void {
    // Initialisation du formulaire avec ses validateurs
    this.livreForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(2)]],
      auteur: ['', [Validators.required, Validators.minLength(3)]],
      annee: ['', [Validators.required, Validators.min(1800), Validators.max(2030)]],
      disponible: [true]
    });

    // Si un id est présent dans l'URL → mode modification
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isModification = true;
      this.livreId = id;
      this.livreService.getLivreById(this.livreId).subscribe(livre => {
        this.livreForm.patchValue(livre); // pré-remplissage du formulaire
      });
    }
  }
  onSubmit(): void {
  if (this.livreForm.invalid) return;

  this.sauvegarde = true;
  const livre: Livre = this.livreForm.value;

  if (this.isModification && this.livreId) {
    this.livreService.modifierLivre(this.livreId, livre).subscribe(() => {
      this.router.navigate(['/livres']).then(() => {
        this.notificationService.afficher('Livre modifié avec succès !');
      });
    });
  } else {
    this.livreService.ajouterLivre(livre).subscribe(() => {
      this.router.navigate(['/livres']).then(() => {
        this.notificationService.afficher('Livre ajouté avec succès !');
      });
    });
  }
}
}
