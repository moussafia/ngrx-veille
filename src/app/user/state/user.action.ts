import { createAction, props } from "@ngrx/store";
import { User } from "../user";

export const loadUsers = createAction('[User] load users');
export const loadUsersSucces = createAction('[User] load user succes',
props<{users: User[]}>())
export const loadUsersFailure = createAction('[User] load user fail',
props<{error: string}>())
export const toggleUserId = createAction('[user] toggle id user');
export const saveUser = createAction('[User] create user',
props<{user: User}>())
export const saveUserSucces = createAction('[User] create user succes',
props<{user: User}>())
export const saveUserFailure = createAction('[User] create user failure',
props<{error: String}>())
