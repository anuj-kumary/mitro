import { v4 as uuid } from 'uuid';
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
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: 'adarshbalak',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: 'b8574c86-df7a-46ed-8bc2-69dd4f99307b',
    content: 'loremmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: 'shubhamsoni',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
