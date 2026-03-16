"use server";

import {auth} from "@/auth";

import {db} from "@/lib/db";

import { getUserById, getAccountByUserId } from "./user";
export { getUserById, getAccountByUserId };


export const currentUser = async()=>{
  const user = await auth();
  return user?.user;
};