import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { Item, resultBook } from '../interfaces/IBooks';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly booksApi = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private httpClient: HttpClient) {}

  searchBooks(valueBooks: string): Observable<resultBook> {
    const params = new HttpParams().append('q', valueBooks);

    return this.httpClient.get<resultBook>(this.booksApi, { params });
  }
}
