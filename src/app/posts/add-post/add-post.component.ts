import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Post} from 'src/app/models/posts.model'
import {AppState} from 'src/app/store/app.state'
import {addPost} from '../postslist/state/posts.actions'

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  myPostForm: FormGroup

  constructor(private store: Store<AppState>) {

  }
  ngOnInit(): void {
    this.myPostForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(3)])
    }
    )
  }

  showDescriptionErrors(): any {
    const descriptionForm = this.myPostForm.get('description')
    if (descriptionForm.touched && !descriptionForm.valid) {
      if (descriptionForm.errors.required) {
        return 'Description is required !!'
      }
      if (descriptionForm.errors.minlength) {
        return 'Description should be at least 3 chars!!'
      }
    }

  }
  onAddPost() {
    if (!this.myPostForm.valid) {
      return
    }
    const post: Post = {
      title: this.myPostForm.value.title,
      description: this.myPostForm.value.description
    }
    this.store.dispatch(addPost({post}))
  }

}
