import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  authenticated: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe((loggedInStatus) => this.authenticated = loggedInStatus);
  }

  logout(): void {
    this.auth.logout();
  }
}