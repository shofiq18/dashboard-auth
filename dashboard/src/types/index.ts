export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'User' | 'Editor';
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}