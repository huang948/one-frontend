import { Component, OnInit, ɵLocaleDataIndex } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  loading: boolean = true;
  resources!: Array<any>;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/resource/all').subscribe(
      (res: any) => {
        console.log(res);
        this.resources = res;
        this.loading = false;
      },
      (err: any) => {
        console.log(err);
        this.resources = [];
      }
    )
  }

  addResource(): void {
    console.log("adding resource...");
    this.http.post('http://localhost:8080/resource/addResource', {}).subscribe(
      (res: any) => {
        this.resources.push(res);
      },
      (err: any) => {
        console.log(err);
      }
    ) 
  }

  deleteResource(resourceId: any): void {
    console.log("deleting resource...");
    console.log(resourceId);
    this.http.delete(`http://localhost:8080/resource/deleteResourceById/${resourceId}`).subscribe(
      (res: any) => {
        this.resources = this.resources.filter((loopResource) => loopResource.resourceId !== resourceId);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
