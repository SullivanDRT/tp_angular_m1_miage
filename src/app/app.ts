import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {Navbar} from './components/navbar/navbar';
import { NotificationService } from './services/notification.service';
import { ListeLivres } from './components/liste-livres/liste-livres';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, CommonModule],
  template: `
    <app-navbar [totalLivres]="total"></app-navbar>
    <div class="notification" *ngIf="notification">{{ notification }}</div>
    <main class="container">
      <router-outlet (activate)="onActivate($event)"></router-outlet>
    </main>
  `,
  styles: [`
    .container { max-width: 1100px; margin: 80px auto 0; padding: 20px; }
    .notification {
      position: fixed;
      top: 70px;
      left: 50%;
      transform: translateX(-50%);
      background: #16a34a;
      color: #fff;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      z-index: 9999;
      box-shadow: 0 4px 20px rgba(22, 163, 74, 0.4);
      animation: slideDown 0.3s ease-out;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
  `]
})
export class App implements OnInit, OnDestroy {
  notification: string = '';
  total: number = 0;
  private sub!: Subscription;
  private livresSub?: Subscription;

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  onActivate(component: unknown): void {
    if (component instanceof ListeLivres) {
      this.livresSub?.unsubscribe();
      this.livresSub = component.nombreLivres.subscribe((count: number) => {
        this.total = count;
        this.cdr.detectChanges();
      });
    }
  }

  ngOnInit(): void {
    this.sub = this.notificationService.message$.subscribe(msg => {
      this.notification = msg;
      this.cdr.detectChanges();
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.ngZone.run(() => {
            this.notification = '';
            this.cdr.detectChanges();
          });
        }, 5000);
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.livresSub?.unsubscribe();
  }
}
