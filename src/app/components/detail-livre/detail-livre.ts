import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-livre',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-livre.html',
  styleUrl: './detail-livre.css',
})
export class DetailLivreComponent implements OnInit {
  livreId: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.livreId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID du livre :', this.livreId);
  }
}
