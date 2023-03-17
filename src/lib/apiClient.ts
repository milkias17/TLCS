import type { UserLogin, UserType } from "@lib/types";
import { NextRouter } from "next/router";

export async function getUser(router: NextRouter | null = null) {
  const resp = await fetch("/api/me");
  if (!resp.ok) {
    return null;
  }

  const user: UserType = await resp.json();
  if (router && resp.redirected) {
    router?.push(resp.url);
  }

  return user;
}

export async function makeRequest(
  url: string,
  router: NextRouter | null = null,
  hasJson: boolean = false
) {
  const resp = await fetch(url);

  if (!resp.ok && !hasJson) {
    return null;
  }

  if (router && resp.redirected) {
    router?.push(resp.url);
  }
  if (hasJson) {
    const body = await resp.json();
    return body.detail;
  }
}

export async function loginUser(
  { email, password, role }: UserLogin,
  router: NextRouter | null = null,
  errorHandler: (errorMsg: string) => void
) {
  const resp = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      role,
    }),
  });

  if (!resp.ok) {
    const responseJson = await resp.json();
    errorHandler(responseJson.detail);
    return true;
  } else if (resp.redirected) {
    router?.push(resp.url);
  }

  return false;
}
