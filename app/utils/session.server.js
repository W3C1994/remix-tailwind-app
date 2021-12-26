import bcrypt from "bcrypt";
import { createCookieSessionStorage, redirect } from "remix";

export async function login({ username, password }) {
  let user;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync("12345678", salt);

  //簡易後端判斷內容
  if (username === "rick") {
    //後端回覆內容
    const backendData = {
      user: {
        id: "1dc45f54-4061-4d9e-8a6d-28d6df6a8d7f",
        createdAt: "2021-11-21T00:28:52.560Z",
        updatedAt: "2021-11-21T00:28:52.560Z",
        username: "rick",
        passwordHash: hash,
      },
    };
    user = backendData.user;
  } else {
    user = null;
  }

  if (!user) return null;
  const isCorrectPassword = bcrypt.compareSync(password, user.passwordHash);
  if (!isCorrectPassword) return null;
  return user;
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "Rick_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(request, redirectTo) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function createUserSession(userId, redirectTo) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
