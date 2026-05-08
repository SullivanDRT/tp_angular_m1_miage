import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private messageSubject = new Subject<string>();
  message$ = this.messageSubject.asObservable();

  afficher(message: string): void {
    this.messageSubject.next(message);
  }
}

