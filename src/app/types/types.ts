import { ReadFieldFunction } from '@apollo/client/cache/core/types/common';

export interface Me {
  _id: string;
  firstName: string;
  middlName: string;
  lastName: string;
  email: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SigninForm {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  cpassword: string;
}

export interface Faculty {
  _id: string;
  groupName: string;
}

export interface Department {
  _id: string;
  depName: string;
}

interface Reaction {
  _id: string;
  like: boolean;
  userId: UserFullName;
}

interface UserFullName {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Comment {
  _id: string;
  comment: string;
  userId: UserFullName;
  createdAt: string;
}

export interface Post {
  _id: string;
  isEvent: boolean;
  eventDate: string;
  title: string;
  description: string;
  departmentId: Department;
  createdAt: string;
  reactionId: Reaction[];
  commentId: Comment[];
  userId: UserFullName;
}
