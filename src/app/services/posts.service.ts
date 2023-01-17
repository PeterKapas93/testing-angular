import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {Post} from '../models/posts.model'

@Injectable({providedIn: 'root'})

export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(`https://console.firebase.google.com/u/0/project/angular-ngrx-cacf4/database/angular-ngrx-cacf4-default-rtdb/data/~2F/posts.json`).pipe(map((data => {
      const posts: Post[] = []
      for (let key in data) {
        posts.push({...data[key], id: key})
      }
      return posts
    })))
  }

  addPost(post: Post): Observable<{name: string}> {
    return this.http.post<{name: string}>(`https://console.firebase.google.com/u/0/project/angular-ngrx-cacf4/database/angular-ngrx-cacf4-default-rtdb/data/~2F/posts.json`, post)
  }

  updatePost(post: Post) {
    const postData = {[post.id]: {title: post.title, description: post.description}}
    return this.http.patch<{name: string}>(`https://console.firebase.google.com/u/0/project/angular-ngrx-cacf4/database/angular-ngrx-cacf4-default-rtdb/data/~2F/posts.json`, post
    )
  }
  deletePost(id: string) {
    return this.http.delete<{id: string}>(`https://console.firebase.google.com/u/0/project/angular-ngrx-cacf4/database/angular-ngrx-cacf4-default-rtdb/data/~2F/posts/${id}.json`
    )
  }
}