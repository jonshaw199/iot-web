import { Message, User } from "@backend/types";

export type GlobalContext = {
  messages: Message[];
  users: User[];
};

export type Action<P = any> = {
  type: string;
  payload?: P;
};

export type ActionCreator<A extends any[], P> = (
  ...args: {
    [B in keyof A]: A[B];
  }
) => Action<P> | Promise<Action<P>> | undefined | null;

export type ActionCreators<P = any> = {
  [key: string]: ActionCreator<any, P>;
};
