import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export const JWT_NAME = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  register(form: FormGroup): any {
    return this.http.post('http://localhost:8080/register', form.getRawValue())
  }

  login(form: FormGroup): any {
    return this.http.post('http://localhost:8080/authenticate', form.getRawValue())
      .pipe(
        map((res: any) => {
          localStorage.setItem(JWT_NAME, res.token);
          return res.token;
        })
      );
  }

  logout(): void {
    localStorage.removeItem(JWT_NAME);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    if (!token) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
}
