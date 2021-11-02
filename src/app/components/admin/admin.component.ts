import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review/review.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public showReviews: boolean;
  public showLogin: boolean;
  public showDetail: boolean;

  public reviews: Review[];
  public reviewDetails: Review;
  public reviewDetailsId: number;

  public user = 'admin';
  public password = 'admin';
  public loginError: string;

  public baseImageUrl = 'https://image.tmdb.org/t/p/w300';

  constructor(private reviewService: ReviewService,
    private router: Router ) { }

  ngOnInit() {
    this.getReviews();

    this.showReviews = true;
    this.showLogin = false;
    this.showDetail = false;
  }

  private getReviews() {
    this.reviewService.getAllReviews().subscribe(data => {
      this.reviews = data.reverse();
    });
  }

  public selectItem(id: any) {
    this.reviewDetailsId = id;
    this.getReviewDetails();
  }

  public submitForm() {
    this.getReviewDetails();
  }

  private getReviewDetails() {
    // Get Review to edit
    this.reviewService.getReviewById(this.reviewDetailsId, this.user, this.password)
    .subscribe(data => {
      this.reviewDetails = data;

      this.showReviews = false;
      this.showLogin = false;
      this.showDetail = true;
    }, (error) => {
      this.handleHTTPError(error);
    });
  }

  public editReview() {
    this.reviewService.editReview(this.reviewDetails, this.reviewDetailsId, this.user, this.password)
    .subscribe(data => {
      this.reviewDetails = data;
      this.ngOnInit();
      }, (error) => {
      this.handleHTTPError(error);
    });
  }
  public deleteReview() {
    this.reviewService.deleteReview(this.reviewDetailsId, this.user, this.password)
    .subscribe(data => {
      this.ngOnInit();
     }, (error) => {
      this.handleHTTPError(error);
    });
  }

  private handleHTTPError(err: any) {

    switch (err.status) {
      case 401:
        this.showReviews = false;
        this.showLogin = true;
        this.showDetail = false;
        this.loginError = 'Bad pasword or user name';
        break;
      case 403:
        this.showReviews = false;
        this.showLogin = true;
        this.showDetail = false;
        this.loginError = 'Unauthorized user';
        break;
    }
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
}
