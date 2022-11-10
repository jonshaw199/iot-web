import { Reducer } from "react";

import { User } from "@backend/types";

export enum ActionType {
  GET_LIST = "GET_LIST",
  GET = "GET",
  UPDATE = "UPDATE",
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export type Action = {
  type: ActionType;
  user?: User;
  users?: User[];
};

export type State = {
  users: Map<string, User>;
  errorMsg: string;
};

export const initialState: State = { users: new Map(), errorMsg: "" };

export const reducer: Reducer<State, Action> = (state, action) => {
  state.errorMsg = "";
  try {
    switch (action.type) {
      case ActionType.CREATE:
        if (action.user) {
          state.users.set(action.user.uuid, action.user);
        } else {
          throw new Error("No user added");
        }
        break;
      case ActionType.DELETE:
        if (action.user) {
          state.users.delete(action.user.uuid);
        } else {
          throw new Error("No user removed");
        }
        break;
      case ActionType.GET_LIST:
        if (action.users) {
          state.users = action.users.reduce(
            (map, usr) => map.set(usr.uuid, usr),
            new Map()
          );
        } else {
          throw new Error("No user list");
        }
        break;
      case ActionType.GET:
        if (action.user) {
          state.users.set(action.user.uuid, action.user);
        } else {
          throw new Error("No user");
        }
        break;
      case ActionType.UPDATE:
        if (action.user) {
          state.users.set(action.user.uuid, action.user);
        } else {
          throw new Error("Cannot update user");
        }
        break;
    }
  } catch (e) {
    if (typeof e === "string") {
      state.errorMsg = e;
    }
  }
  return state;
};
