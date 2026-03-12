"use server";

import {auth} from "@/auth";

import {db} from "@/lib/db";

export { getUserById, getAccountByUserId } from "./user";


export const currentUser = async()=>{
  const user = await auth();
  return user?.user;
};