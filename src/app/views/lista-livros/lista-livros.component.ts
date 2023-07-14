import { Item, resultBook } from './../../interfaces/IBooks';
import { Component } from '@angular/core';
import {
  EMPTY,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';
import { LivroVolumeInfo } from 'src/app/interfaces/livroVolumeInfo';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  search = new FormControl();

  mensagemErro = '';
  booksResult: resultBook;

  constructor(private livroService: LivroService) {}

  foundBooks$ = this.search.valueChanges.pipe(
    debounceTime(300),
    filter((valueEntered) => valueEntered.length >= 2),
    tap(() => console.log('INITE')),
    distinctUntilChanged(),
    switchMap((valueEntered) => this.livroService.searchBooks(valueEntered)),
    map((result) => (this.booksResult = result)),
    map((result) => result.items ?? []),
    map((returnBooks) => this.returnSearchBook(returnBooks)),

    catchError((erro) => {
      // this.mensagemErro = 'Ops, ocorreu um erro, recarregue a pagina!';
      // return EMPTY;
      console.log(erro);
      return throwError(
        () =>
          new Error(
            (this.mensagemErro = 'Ops, ocorreu um erro, recarregue a pagina!')
          )
      );
    })
  );

  returnSearchBook(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}
