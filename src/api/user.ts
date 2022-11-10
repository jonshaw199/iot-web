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

export function update(uuid: string, user: Partial<User>) {
  return req(`/user${uuid}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function deleteUser(uuid: string) {
  return req(`/user/${uuid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function get() {
  return req("/user");
}
