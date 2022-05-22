import { formatDate } from '../utils/authUtils';

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: '406acf0d-a683-4c80-a42d-92f0c6544dca',
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: 'adarshbalak',
    createdAt: '2022-05-15T12:00:28+05:30',
    updatedAt: formatDate(),
  },
  {
    _id: 'b8574c86-df7a-46ed-8bc2-69dd4f99307b',
    content: 'Hey what"s app guy"s what"s going on?',
    likes: {
      likeCount: 4,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: 'anujkumar',
    createdAt: '2022-01-10T10:55:06+05:30',
    updatedAt: formatDate(),
  },
  {
    _id: 'c789564c86-df7a-46ed-8bc2-69dd4f99307b',
    content: 'I am done with the social media project can please provide some valuable feebback',
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: 'adarshbalak',
    createdAt: '2022-05-21T10:55:06+05:30',
    updatedAt: formatDate(),
  },
];
