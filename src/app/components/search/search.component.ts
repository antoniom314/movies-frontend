
import { Component, OnInit, Output, EventEmitter, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AutofocusDirective } from '../../autofocus.directive';
import { GenresService } from '../../services/genres/genres.service';
import { Result, Search } from '../../models/search';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  // public marginProperty = 'ml-auto';

  public search: Search;
  public results: Result[];

  // search string from a user input
  public searchString = '';
  public baseImageUrl = 'https://image.tmdb.org/t/p/w92';

  constructor(private searchService: SearchService,
    private genresService: GenresService,
    private activeRoute: ActivatedRoute,
    private router: Router) {}

  // tslint:disable-next-line: no-output-rename
  @Output('hideSearchBar') hideSearchBar: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    // Get movie details with id prametar passed from a search component
    this.activeRoute.queryParams.subscribe((string) => {
      this.searchString = string['search'];
      if (this.searchString) {
        this.searchMovies(this.searchString);
      }
    });

    // for testing
    // this.searchMockMovies();
  }

  public goBack() {
    this.hideSearchBar.emit();
    this.searchString = '';
    this.search = null;
    this.results = null;

    const navigationExtras: NavigationExtras = {
      queryParams: { }
    };
    // Go back to review page and pass search string to ActiveRoutes
    this.router.navigate(['/review'], navigationExtras);
  }

  public showMovieDetail(movieId: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: movieId,
        search: this.searchString
      }
    };
    const relativePath = '/details/' + movieId;
    // Go to details page and pass to ActiveRoutes id parametar
    // and search string for back button
    this.router.navigate([relativePath], navigationExtras);
  }

  public searchMovies(search: string) {

    if (this.searchString) {
      this.searchService.searchAPI(this.searchString).subscribe((data) => {
        this.search = data;
        this.results = data.results;
      });
    }
  }

  private searchMockMovies() {
    this.searchService.searchMockAPI().subscribe((data) => {
      this.search = data;
      this.results = data.results;
    });
  }

  public getGenreSearch(ids: number[]): string {
    return this.genresService.getGenresForSearch(ids);
  }

}
