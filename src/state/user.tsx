import { Reducer, createContext } from "react";

import { Action } from "../types";
import { AuthRequest, User } from "@backend/types";
import { getList, get, create, remove, update, auth } from "../api/user";
import useReducerWithActions from "../hooks/useReducerWithActions";

export enum UserActionType {
  GET_LIST = "GET_LIST",
  GET = "GET",
  UPDATE = "UPDATE",
  CREATE = "CREATE",
  REMOVE = "REMOVE",
  AUTH = "AUTH",
}

type UserPayload = {
  user?: User;
  users?: User[];
  token?: string;
};

type UserState = {
  users: Map<string, User>;
  errorMsg: string;
  token: string;
};

const initialUserState: UserState = {
  users: new Map(),
  errorMsg: "",
  token: "",
};

type UserActionCreators = {
  getList: () => Promise<Action<UserPayload>>;
  get: (uuid: string) => Promise<Action<UserPayload>>;
  create: (user: Partial<User>) => Promise<Action<UserPayload>>;
  update: (uuid: string, user: Partial<User>) => Promise<Action<UserPayload>>;
  remove: (uuid: string) => Promise<Action<UserPayload>>;
  auth: (cred: AuthRequest) => Promise<Action<UserPayload>>;
};

const userActionCreators: UserActionCreators = {
  getList: () =>
    getList().then((users) => ({
      type: UserActionType.GET_LIST,
      payload: { users },
    })),
  get: (uuid: string) =>
    get(uuid).then(({ user }) => ({
      type: UserActionType.GET,
      payload: { user },
    })),
  create: (user: Partial<User>) =>
    create(user).then(({ user, token }) => ({
      type: UserActionType.CREATE,
      payload: { user, token },
    })),
  update: (uuid: string, user: Partial<User>) =>
    update(uuid, user).then(({ user }) => ({
      type: UserActionType.UPDATE,
      payload: { user },
    })),
  remove: (uuid: string) =>
    remove(uuid).then(({ user }) => ({
      type: UserActionType.REMOVE,
      payload: { user },
    })),
  auth: (cred: AuthRequest) =>
    auth(cred).then(({ token }) => ({
      type: UserActionType.AUTH,
      payload: { token },
    })),
};

const userReducer: Reducer<UserState, Action<UserPayload>> = (
  state,
  action
) => {
  state.errorMsg = "";
  try {
    switch (action.type) {
      case UserActionType.CREATE:
        if (action.payload?.user) {
          state = { ...state };
          state.users = new Map(state.users).set(
            action.payload.user.uuid,
            action.payload.user
          );
          // token?
        } else {
          throw new Error("No user added");
        }
        break;
      case UserActionType.REMOVE:
        if (action.payload?.user) {
          state = { ...state };
          state.users = new Map(state.users);
          state.users.delete(action.payload.user.uuid);
        } else {
          throw new Error("No user removed");
        }
        break;
      case UserActionType.GET_LIST:
        if (action.payload?.users) {
          state = { ...state };
          state.users = action.payload.users.reduce(
            (prev, cur) => prev.set(cur.uuid, cur),
            new Map()
          );
        } else {
          throw new Error("No user list");
        }
        break;
      case UserActionType.GET:
        if (action.payload?.user) {
          state = { ...state };
          state.users = new Map(state.users);
          state.users.set(action.payload?.user.uuid, action.payload.user);
        } else {
          throw new Error("No user");
        }
        break;
      case UserActionType.UPDATE:
        if (action.payload?.user) {
          state = { ...state };
          state.users = new Map(state.users).set(
            action.payload.user.uuid,
            action.payload.user
          );
        } else {
          throw new Error("Cannot update user");
        }
        break;
      case UserActionType.AUTH:
        if (action.payload?.token) {
          state = {
            ...state,
            token: action.payload.token,
          };
          localStorage.setItem("token", action.payload.token);
        } else {
          throw new Error("No token");
        }
    }
  } catch (e) {
    if (typeof e === "string") {
      state.errorMsg = e;
    }
  }
  return state;
};

export function useUserState() {
  return useReducerWithActions<UserState, UserPayload, UserActionCreators>({
    reducer: userReducer,
    initialState: initialUserState,
    actionCreators: userActionCreators,
  });
}

export const GlobalUserContext = createContext({
  ...initialUserState,
  ...userActionCreators,
});
