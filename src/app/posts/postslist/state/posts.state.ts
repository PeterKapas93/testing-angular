import {Post} from "src/app/models/posts.model"

export interface PostState {
  posts: Post[]
}

export const initialState: PostState = {
  posts: [
    {
      id: '1',
      title: 'sample1',
      description: 'sample1 desc'
    },
    {
      id: '2',
      title: 'sample2',
      description: 'sample2 desc'
    }
  ]
}