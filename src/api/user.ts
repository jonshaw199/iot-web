import { UserResponse, User, AuthResponse, AuthRequest } from "@backend/types";
import { req } from "./api";

export function create(user: Partial<User>) {
  return req<UserResponse>("/user", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function update(uuid: string, user: Partial<User>) {
  return req<UserResponse>(`/user${uuid}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function remove(uuid: string) {
  return req<User>(`/user/${uuid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getList() {
  return req<User[]>("/user");
}

export function get(uuid: string) {
  return req<User>(`/user/${uuid}`);
}

export function auth(body: AuthRequest) {
  return req<AuthResponse>("/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
