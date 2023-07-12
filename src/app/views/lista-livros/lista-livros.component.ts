import { VolumeInfo } from './../../interfaces/IBooks';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { book } from 'src/app/interfaces/IBooks';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listBook: book[];
  search: string = '';
  subscription: Subscription;

  book: book;

  constructor(private livroService: LivroService) {}

  searchBooks() {
    this.subscription = this.livroService.searchBooks(this.search).subscribe({
      next: (returnBooks) => {
        this.listBook = this.returnSearchBook(returnBooks);
      },

      error: (error) => console.error(error, 'erro'),
    });
  }

  returnSearchBook(items) {
    const livros: book[] = [];

    items.map((item) => {
      livros.push(
        (this.book = {
          title: item.volumeInfo?.title,
          authors: item.volumeInfo?.authors,
          publisher: item.volumeInfo?.publisher,
          publishedDate: item.volumeInfo?.publishedDate,
          description: item.volumeInfo?.description,
          previewLink: item.volumeInfo?.previewLink,
          thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
        })
      );
    });

    return livros;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
