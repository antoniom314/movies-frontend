import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenreIds } from '../../models/details';
import { Genre, Genres } from '../../models/genres';

@Injectable()
export class GenresService {

  private genreList: Genre[];
  private genrePath = '../../assets/genres.json';

  public constructor(private http: HttpClient) {

    this.getGenresFromFile();
    // if (genreList && !this.genreList ) {
    //   this.genreList = genreList;
    // }
  }

  // get genre name list from 'genres.json file
  private getGenresFromFile() {
    this.http.get<Genres>(this.genrePath)
    .subscribe( result => {
      this.genreList = result.genres;
     });
  }

  public getGenresForSearch(ids: number[]): string {
    if (!this.genreList) { return ''; }
    let genresString = '';
    ids.forEach(id => {
      if (genresString.length === 0) {
        genresString = genresString
          + this.genreList.find(genre => genre.id === id).name;
      } else {
        genresString = genresString + ', '
          + this.genreList.find(genre => genre.id === id).name;
      }
    });

    return genresString;
  }

  public getGenresForDetails(ids: GenreIds[]): string {
    if (!this.genreList) { return ''; }
    let genresString = '';

    ids.forEach(data => {

      if (genresString.length === 0) {
        genresString = genresString + data.name;
      } else {
        genresString = genresString + ', ' + data.name;
      }
    });

    return genresString;
  }

}
