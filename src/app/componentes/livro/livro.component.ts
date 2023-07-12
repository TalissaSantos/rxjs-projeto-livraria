import { Component, Input } from '@angular/core';
import { book } from 'src/app/interfaces/IBooks';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css'],
})
export class LivroComponent {
  @Input() livro: book;
  modalAberto: boolean;

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
