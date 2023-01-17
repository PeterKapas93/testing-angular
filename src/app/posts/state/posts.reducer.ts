import {state} from "@angular/animations"
import {createReducer, on} from "@ngrx/store"
import {addPost, addPostSuccess, deletePost, deletePostSuccess, loadPostsSuccess, updatePost, updatePostSuccess} from "./posts.actions"
import {initialState} from "./posts.state"

const _postsReducer = createReducer(initialState,
  on(addPostSuccess, (state, action) => {
    let post = {...action.post}
    post.id = (state.posts.length + 1).toString()
    return {
      ...state,
      posts: [...state.posts, post]
    }
  }),
  on(updatePostSuccess, (state, action) => {
    const updatedPost = state.posts.map((post) =>
      post.id === action.post.id ? action.post : post)
    return {
      ...state,
      posts: updatedPost
    }
  }),
  on(deletePost, (state, action) => {
    const updatedPosts = state.posts.filter(post => post.id !== action.id)
    return {
      ...state,
      posts: updatedPosts
    }
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts
    }
  }),
  on(deletePostSuccess, (state, action) => {
    const updatedPosts = state.posts.filter(
      post => post.id !== action.id)
    return {
      ...state,
      posts: updatedPosts
    }
  })
)

export function postsReducer(state, action) {
  return _postsReducer(state, action)
}