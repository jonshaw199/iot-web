import { User } from "@backend/types";
import { req } from "./api";

export function create(user: User) {
  return req("/user", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
