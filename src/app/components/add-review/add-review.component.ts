import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent implements OnInit {
  public showCard = true;
  public showLogin = false;
  public reviewText = '    ';

  public user = 'user';
  public password = 'user';
  public loginError: string;

  public review: Review;
  // Movie TMDB id geted from DetailsComponent
  public movieIdTMDB: string;
  private searchString: string;
  public baseImageUrl = 'https://image.tmdb.org/t/p/w154';

  constructor(
    private reviewService: ReviewService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Getprametars passed from a details component
    this.activeRoute.queryParams.subscribe((params) => {
      this.movieIdTMDB = params['movieId'];
      this.searchString = params['search'];

      this.review = {
        id: -1,
        title: params['title'],
        // Text is not deffined yet
        text: this.reviewText,
        genre: params['genre'],
        imagePath: params['imagePath'],
        date: params['date']
      };
    });
  }

  public goBack() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.movieIdTMDB,
        search: this.searchString
      }
    };
    const relativePath = '/details/' + this.movieIdTMDB;
    this.router.navigate([relativePath], navigationExtras);
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

  public goHome() {
    this.router.navigate(['/review']);
  }

  public postRecommendation() {
    this.showCard = false;
    this.showLogin = true;
    // this.review.text = this.reviewText;
    // this.reviewService.postReview(this.review)
    //   .subscribe(
    //     (data) => {
    //       if (data) {
    //         console.log(data);
    //         this.router.navigate(['/review']);
    //         this.showCard = true;
    //         this.showLogin = false;
    //       }
    //     },
    //     (error) => {
    //       console.log('error');
    //       console.log(error);

    //     }
    //   );
  }

  public submitForm() {
    this.review.text = this.reviewText;
    this.reviewService.postReview(this.review, this.user, this.password)
      .subscribe(
        (data) => {
          if (data) {
            this.router.navigate(['/review']);
            this.showCard = true;
            this.showLogin = false;
          }
        },
        (error) => {
          this.handleHTTPError(error);
        }
      );
  }

  private handleHTTPError(err: any) {
    switch (err.status) {
      case 401:
        this.showCard = false;
        this.showLogin = true;
        this.loginError = 'Bad pasword or user name';
        break;
      case 403:
        this.showCard = false;
        this.showLogin = true;
        this.loginError = 'Unauthorized user';
        break;
    }
  }
}
