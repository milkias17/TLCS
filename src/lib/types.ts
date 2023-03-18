import { UserRole } from "@prisma/client";

export type UserType = {
  fname: string;
  lname: string;
  role: string;
};

export type UserLogin = {
  email: string;
  password: string;
  role: string;
};

export type ErrorType = {
  detail: string;
};

export type UserCreate = {
  password: string;
  fname: string;
  lname: string;
  email: string;
  role: UserRole;
  phone_number?: string;
  department?: string;
  college?: string;
  batch?: string;
};
