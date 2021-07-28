import { Component, OnInit, ɵLocaleDataIndex } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Emitters } from '../emitters/emitters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  loading: boolean = true;
  resources!: Array<any>;

  header: object = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem("token")}`)
      .set('Content-Type', 'application/json')
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/resource/all', this.header).subscribe(
      (res: any) => {
        console.log(res);
        Emitters.authEmitter.emit(true);
        this.resources = res;
        this.loading = false;
      },
      (err: any) => {
        console.log(err);
        this.resources = [];
        Emitters.authEmitter.emit(false);
      }
    )
  }

  addResource(): void {
    console.log("adding resource...");
    this.http.post('http://localhost:8080/resource/addResource', {}, this.header).subscribe(
      (res: any) => {
        location.reload();
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  deleteResource(resource: any): void {
    console.log("deleting resource...");
    console.log(resource);
    this.http.post('http://localhost:8080/resource/deleteResource', resource, this.header).subscribe(
      (res: any) => {
        this.resources.filter((loopResource) => loopResource.resourceId !== resource.resourceId);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
