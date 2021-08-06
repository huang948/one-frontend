import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export const JWT_NAME = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  register(form: FormGroup): any {
    return this.http.post('http://localhost:8080/register', form.getRawValue())
  }

  login(form: FormGroup): any {
    return this.http.post('http://localhost:8080/authenticate', form.getRawValue())
      .pipe(
        map((res: any) => {
          this.isLoggedIn.next(true);
          localStorage.setItem(JWT_NAME, res.token);
          return res.token;
        })
      );
  }

  logout(): void {
    this.isLoggedIn.next(false);
    localStorage.removeItem(JWT_NAME);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    if (!token) {
      this.isLoggedIn.next(false);
      return false;
    }
    this.isLoggedIn.next(true);
    return !this.jwtHelper.isTokenExpired(token);
  }

}
