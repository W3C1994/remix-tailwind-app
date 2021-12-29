import { json, useActionData, useSearchParams, redirect } from "remix";
import { createUserSession, login } from "~/utils/session.server";

const badRequest = (data) => json(data, { status: 400 });

//驗證用戶名稱格式
function validateUsername(username) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}
//驗證用戶密碼格式
function validatePassword(password) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

//表單post後執行
export const action = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const username = form.get("username");
  const password = form.get("password");
  const redirectTo = form.get("redirectTo") || "/";

  if (
    typeof loginType !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { loginType, username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };
  //只要陣列中存在字串不為空值返回true
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  switch (loginType) {
    case "login": {
      // login to get the user
      // if there's no user, return the fields and a formError
      // if there is a user, create their session and redirect to /
      const user = await login({ username, password });
      if (!user) {
        return badRequest({
          fields,
          formError: `Username/Password combination is incorrect`,
        });
      }

      // return badRequest({
      //   fields,
      //   formError: "Not implemented",
      // });
      return createUserSession(user.id, redirectTo);
    }
    case "register": {
      // const userExists = await db.user.findFirst({
      //   where: { username },
      // });
      // if (userExists) {
      //   return badRequest({
      //     fields,
      //     formError: `User with username ${username} already exists`,
      //   });
      // }
      // create the user
      // create their session and redirect to /jokes
      return badRequest({
        fields,
        formError: "Not implemented",
      });
    }
    default: {
      return badRequest({
        fields,
        formError: `Login type invalid`,
      });
    }
  }
};

export default function Login() {
  const actionData = useActionData();
  //用來取得requireUserId中所建立的redirectTo並且在驗證成功後重新定向
  const [searchParams] = useSearchParams();

  return (
    <form
      method="post"
      aria-describedby={
        actionData?.formError ? "form-error-message" : undefined
      }
    >
      <input
        type="hidden"
        name="redirectTo"
        value={searchParams.get("redirectTo") ?? undefined}
      />
      <fieldset>
        <legend>登入</legend>
        <label className={"bg-blue-500"}>
          {/*切換登入或註冊*/}
          <input
            type="radio"
            name="loginType"
            value="login"
            defaultChecked={
              !actionData?.fields?.loginType ||
              actionData?.fields?.loginType === "login"
            }
          />{" "}
        </label>
      </fieldset>
      {/*帳號 包含錯誤提示*/}
      <div>
        <label htmlFor="username-input">Username</label>
        <input
          type="text"
          id="username-input"
          name="username"
          defaultValue={actionData?.fields?.username}
          aria-invalid={Boolean(actionData?.fieldErrors?.username)}
          aria-describedby={
            actionData?.fieldErrors?.username ? "username-error" : undefined
          }
        />
        {actionData?.fieldErrors?.username ? (
          <p className="form-validation-error" role="alert" id="username-error">
            {actionData?.fieldErrors.username}
          </p>
        ) : null}
      </div>
      {/*密碼 包含錯誤提示*/}
      <div>
        <label htmlFor="password-input">Password</label>
        <input
          id="password-input"
          name="password"
          defaultValue={actionData?.fields?.password}
          type="password"
          aria-invalid={Boolean(actionData?.fieldErrors?.password) || undefined}
          aria-describedby={
            actionData?.fieldErrors?.password ? "password-error" : undefined
          }
        />
        {actionData?.fieldErrors?.password ? (
          <p className="form-validation-error" role="alert" id="password-error">
            {actionData?.fieldErrors.password}
          </p>
        ) : null}
      </div>
      {/*表單錯誤提示*/}
      <div id="form-error-message">
        {actionData?.formError ? (
          <p className="form-validation-error" role="alert">
            {actionData?.formError}
          </p>
        ) : null}
      </div>
      <button type="submit">提交</button>
    </form>
  );
}
