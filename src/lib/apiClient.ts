import type { UserLogin, UserType } from "@lib/types";
import { NextRouter } from "next/router";

export async function getUser(
  url: string | URL = "/api/me",
  router: NextRouter | null = null
) {
  const resp = await fetch(url);
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
    if (!resp.ok) {
      return body.detail;
    } else {
      return body;
    }
  }
}

export async function makePostRequest(
  url: string,
  body: any,
  router: NextRouter | null = null,
  hasJson: boolean = false
) {
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!resp.ok && !hasJson) {
    return null;
  }

  if (router && resp.redirected) {
    router?.push(resp.url);
    return;
  }

  if (!resp.ok && hasJson) {
    const body = await resp.json();
    return body.detail;
  }

  return body;
}

export async function makePutRequest(
  url: string,
  body: any,
  router: NextRouter | null = null,
  hasJson: boolean = false
) {
  const resp = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  if (!resp.ok && !hasJson) {
    return null;
  }

  if (router && resp.redirected) {
    router?.push(resp.url);
  }

  if (!resp.ok && hasJson) {
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
    console.log(responseJson);
    errorHandler(responseJson.detail);
    return true;
  } else if (resp.redirected) {
    router?.push(resp.url);
  }

  return false;
}
