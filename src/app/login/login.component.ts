import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  submit(): void {
    this.http.post('http://localhost:8080/authenticate', this.form.getRawValue())
      .subscribe((res: any) => {
        localStorage.setItem("token", res.token);
        this.router.navigate(['/']);
      });
  }

}
