import {createFeatureSelector, createSelector} from "@ngrx/store"
import {PostState} from "./posts.state"

const getPostsState = createFeatureSelector<PostState>('posts')

//READ
export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts
})

//UPDATE
export const getPostById = createSelector(getPostsState, (state, props) => {
  return state.posts.find(post => post.id === props.id)
})