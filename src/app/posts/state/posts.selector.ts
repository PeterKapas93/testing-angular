import {createFeatureSelector, createSelector} from "@ngrx/store"
import {PostState} from "./posts.state"
export const POST_STATE_NAME = 'posts'

const getPostsState = createFeatureSelector<PostState>(POST_STATE_NAME)

//READ
export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts
})

//UPDATE
export const getPostById = createSelector(getPostsState, (state, props) => {
  return state.posts.find(post => post.id === props.id)
})