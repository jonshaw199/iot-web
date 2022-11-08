import { Message, User } from "@backend/types";

export type GlobalContext = {
  messages: Message[];
  users: User[];
};
