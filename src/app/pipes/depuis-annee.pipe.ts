import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'depuisAnnee',
  standalone: true
})
export class DepuisAnneePipe implements PipeTransform {
  transform(annee: number): string {
    const diff = new Date().getFullYear() - annee;
    if (diff < 1) return 'publié cette année';
    if (diff === 1) return 'publié il y a 1 an';
    return `publié il y a ${diff} ans`;
  }
}

