import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Search } from '../../models/search';

@Injectable()
export class SearchService {

  private apiKey = 'api_key=b2000054e469cfa7dd6ee85e1f544007';
  // TheMovieDB API endpoint for searching movies
  private searchUrl =
    'https://api.themoviedb.org/3/search/movie';

  constructor(private http: HttpClient) {}

  private mockSearchPath = '../../assets/search-example.json';

    // get list of movies matching by name
  public searchAPI(title: string): Observable<Search> {
    return this.http.get<Search>(this.searchUrl + '?' + this.apiKey + '&query=' + title);
  }

  public searchMockAPI(): Observable<Search> {
    return this.http.get<Search>(this.mockSearchPath);
  }
}
