import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Foo } from './foo.model';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {
   data: Object;
   loading: boolean;
    o :Observable<Object>;
    fooData : Foo[];
    oFoo : Observable<Foo[]>;
  constructor(public http: HttpClient) { }
     makeRequest(): void {
     console.log("here");
     this.loading = true;
     this.o = this.http.get('https://jsonplaceholder.typicode.com/posts/1');
     this.o.subscribe(this.getData);

    }
    makeTypedRequest() : void
    {
   //oFoo : Observable<Foo[]>; va dichiarato tra gli attributi della classe
   this.oFoo = this.http.get<Foo[]>('https://jsonplaceholder.typicode.com/posts');
   this.oFoo.subscribe(data => {this.fooData = data;});
    }

    makeCompactRequest(): void {
     this.loading = true;
     this.http
       .get('https://jsonplaceholder.typicode.com/posts/1')
       .subscribe(newData => {
       this.data = newData;
       this.loading = false;
       });
    }
    getData = (d : Object) =>
    {
      this.data = new Object(d);
      this.loading = false;
    }


  ngOnInit() {
  }

}
