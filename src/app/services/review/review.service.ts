import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Review } from '../../models/review';
import { Login } from '../../models/login';

@Injectable()
export class ReviewService {

  private static getHostUrl = 'http://digitalplayground.online:8303';
  private static getReviewsUrl = ReviewService.getHostUrl + '/api/get_reviews';
  private static getReviewByIdUrl = ReviewService.getHostUrl + '/api/get_review';
  private static postReviewUrl = ReviewService.getHostUrl + '/api/add_review';
  private static editReviewUrl = ReviewService.getHostUrl + '/api/edit_review';
  private static deleteReviewUrl = ReviewService.getHostUrl + '/api/delete_review';

  constructor(private http: HttpClient) { }

  public getAllReviews(): Observable<Review[]> {
    const resetCache = 'true';
    const headers = new HttpHeaders({resetCache, observe: 'response' });

    return this.http.get<Review[]>(ReviewService.getReviewsUrl, {headers});
  }

  public getReviewById(id: number, user: string, password: string): Observable<Review> {
    const resetCache = 'false';
    const headers = new HttpHeaders({resetCache, observe: 'response' });

    return this.http.get<Review>(ReviewService.getReviewByIdUrl + '/' + id, {headers});
  }

  public login( login: Login) {
    console.log(login);

    const data = {'userName': 'user', 'password': 'user'};
      const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    const headers = new HttpHeaders({Authorization: 'Basic '
     + btoa('user' + ':' + 'user'), 'withCredentials': 'true' });
     headers.set('Content-Type', 'application/json') ;

    return this.http.post<Review[]>(ReviewService.getReviewsUrl, data, {headers});
  }

  public postReview(review: Review, user: string, password: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic '
     + btoa('user' + ':' + 'user'),
      'withCredentials': 'true' });
    return this.http.post<Review>(ReviewService.postReviewUrl, review, {headers});
  }

  public editReview(review: Review, id: number, user: string, password: string): Observable<Review> {
    // const headers = new HttpHeaders({Authorization: 'Basic '
    //  + btoa(user + ':' + password) });
    return this.http.put<Review>(ReviewService.editReviewUrl + '/' + id, review, {withCredentials : true});
  }

  public deleteReview(id: number, user: string, password: string) {
    // const headers = new HttpHeaders({Authorization: 'Basic '
    //  + btoa(user + ':' + password) });
    return this.http.delete<Review>(ReviewService.deleteReviewUrl + '/' + id, {withCredentials : true});
  }
}
