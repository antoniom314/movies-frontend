import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review/review.service';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = 'user';
  public password = 'user';
  public loginError: string;

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
  }

  public submitForm() {

    const loginInfo: Login = {
      'userName': this.user,
      'password': this.password
    };

    this.reviewService.login(loginInfo)
      .subscribe(

        (data) => {

        console.log(loginInfo);
          if (data) {
            console.log(data);

            // this.router.navigate(['/review']);
            // this.showCard = true;
            // this.showLogin = false;
          }
        },
        (error) => {
          //this.handleHTTPError(error);
        }
      );
  }

}
