import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Details } from '../../models/details';

@Injectable()
export class DetailsService {

  private apiKey = 'api_key=b2000054e469cfa7dd6ee85e1f544007';
  // TheMovieDB API endpoint for geting movie details
  private detailsUrl = 'https://api.themoviedb.org/3/movie/';
  private mockDetailsPath = '../../assets/movie-details-example.json';

  constructor(private http: HttpClient) {}

    // get movie details matching by id
  public movieDetailsAPI(id: number): Observable<Details> {
    return this.http.get<Details>(this.detailsUrl + id + '?' + this.apiKey);
  }

  public movieDetailsMockAPI(): Observable<Details> {
    return this.http.get<Details>(this.mockDetailsPath);
  }
}
