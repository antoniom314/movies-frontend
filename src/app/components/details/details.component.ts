import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { GenresService } from '../../services/genres/genres.service';
import { DetailsService } from '../../services/details/details.service';
import { GenreIds, Details } from '../../models/details';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [DatePipe],
})
export class DetailsComponent implements OnInit {

  public movieDetails: Details;
  // Movie TMDB id to send to AddReviewComponent
  public movieIdTMDB: string;
  private searchString: string;
  public genresString: string;
  public baseImageUrl = 'https://image.tmdb.org/t/p/w780';

  constructor(
    private detailsService: DetailsService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private genresService: GenresService
   ) { }

  ngOnInit() {
    // Get movie details with id prametar passed from a search component
    this.activeRoute.queryParams.subscribe(params => {
      this.getMovieDetails(params['id']);
      this.movieIdTMDB = params['id'];
      this.searchString = params['search'];
    });
    // For testing
    // this.getMockMovieDetails();
  }

  public goBack() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        search: this.searchString
      }
    };
    // Go back to search page and pass search string to ActiveRoutes
    this.router.navigate(['/review'], navigationExtras);
  }

  public goSearch() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        search: ''
      }
    };
    // Go back to search page and pass search string to ActiveRoutes
    this.router.navigate(['/review'], navigationExtras);
  }

  public getMovieDetails(movieId: number) {
    this.detailsService.movieDetailsAPI(movieId).subscribe((data) => {
      this.movieDetails = data;
    });
  }

  private getMockMovieDetails() {
    this.detailsService.movieDetailsMockAPI().subscribe((data) => {
      this.movieDetails = data;
    });
  }

  public getGenreDetails(ids: GenreIds[]): string {
    this.genresString = this.genresService.getGenresForDetails(ids);
    return this.genresString;
  }

  public openAddRecommendation() {

    console.log(this.genresString);

    const navigationExtras: NavigationExtras = {
      queryParams: {
        movieId: this.movieIdTMDB,
        search: this.searchString,
        title: this.movieDetails.title,
        genre: this.genresString,
        imagePath: this.movieDetails.poster_path,
        date: this.movieDetails.release_date
      },
    };
    this.router.navigate(['/add-review'], navigationExtras);
  }

  public createPoster() {
    const url = 'http://localhost:4301/?image_url=' + this.baseImageUrl + this.movieDetails.poster_path;
    window.open(url); // , '_blank'
  }
}
