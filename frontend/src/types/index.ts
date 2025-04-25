export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userImage?: string;
  createdAt: string;
  replies?: Comment[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
}
