import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private connecte = false;

  seConnecter(): void {
    this.connecte = true;
  }

  seDeconnecter(): void {
    this.connecte = false;
  }

  estConnecte(): boolean {
    return this.connecte;
  }
}

