import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-3bb2c-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    this.http
      .get<{ [key: string]: Post }>('https://ng-complete-guide-3bb2c-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData){
            if(responseData.hasOwnProperty(key)) { 
              postsArray.push({ ...responseData[key], id: key}); 
            }
          }
          return postsArray;
        })
    )
    .subscribe(posts => {
      this.loadedPosts = posts;
    })
  }

  onClearPosts() {
    // Send Http request
  }
}
