import { createFeatureSelector, createReducer, createSelector , on } from "@ngrx/store";
import { User } from "../user";
import * as UserAction from './user.action';


export interface UserState{
    showUserId: boolean;
    currentUser: User | null;
    users: User[];
    error:string;
}
const InitialUserState : UserState = {
    showUserId: true,
    currentUser: null,
    users: [],
    error:''
}
const getUsersFeatureState = createFeatureSelector<UserState>('users');
export const getShowUserId = createSelector(
getUsersFeatureState,
(state)=>state.showUserId
)
export const getUsers = createSelector(
    getUsersFeatureState,
    state=>state.users
)
export const UserReducer = createReducer<UserState>(
    InitialUserState,
    on(UserAction.loadUsersSucces,(state , action): UserState=>{
        return {
            ...state,
            users: action.users,
            error:''
        }
}),
    on(UserAction.loadUsersFailure,(state , action): UserState=>{
        return {
            ...state,
            users: [],
            error:action.error
        }
    }),
    on(UserAction.toggleUserId,(state)=>{
        return {
            ...state,
            showUserId:!state.showUserId
        }
    }),
    on(UserAction.saveUserSucces,(state, action): UserState=>{
        return {
            ...state,
            users: [...state.users, action.user],
            error: '',

        }
    })
)