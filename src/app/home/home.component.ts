import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message: String = 'You are not logged in';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem("token")}`)
    };

    this.http.get('http://localhost:8080/user', header).subscribe(
      (res: any) => {
        console.log(res);
        Emitters.authEmitter.emit(true);
        this.message = 'You are logged in. Redirecting to resource...';
        setTimeout(() => {
          this.router.navigate(['/resource']);
        }, 3000);
      },
      (err: any) => {
        console.log(err);
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    )
  }

}
