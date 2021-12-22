import { Link } from "remix";

export default function Index() {
  return (
    <div
      className={"flex flex-wrap"}
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
    >
      <div
        className={
          "m-5 shadow-2xl p-2 shadow-indigo-300 rounded-2xl text-center"
        }
      >
        <h1>預載 星際大戰人物資料</h1>
        <button
          className={
            "m-5 p-3 bg-blue-500 shadow-2xl shadow-indigo-400 rounded-2xl hover:bg-cyan-200"
          }
        >
          <Link prefetch="intent" to={"/posts"}>
            Posts
          </Link>
        </button>
      </div>
      <div
        className={
          "m-5 shadow-2xl p-2 shadow-indigo-400 rounded-2xl text-center"
        }
      >
        <h1>星際大戰人物資料</h1>
        <button
          className={
            "m-5 p-3 bg-blue-500 shadow-2xl shadow-indigo-400 rounded-2xl hover:bg-cyan-200"
          }
        >
          <Link to={"/posts"}>Posts Not intent</Link>
        </button>
      </div>
      <div
        className={
          "m-5 shadow-2xl p-2 shadow-indigo-500 rounded-2xl text-center"
        }
      >
        <h1>星際大戰與機器人</h1>
        <button
          className={
            "m-5 p-3 bg-blue-500 shadow-2xl shadow-indigo-400 rounded-2xl hover:bg-cyan-200"
          }
        >
          <Link to={"/robots"}>Robots</Link>
        </button>
      </div>
      <div
        className={
          "m-5 shadow-2xl p-2 shadow-indigo-600 rounded-2xl text-center"
        }
      >
        <h1>星際大戰與機器人-預載入</h1>
        <button
          className={
            "m-5 p-3 bg-blue-500 shadow-2xl shadow-indigo-400 rounded-2xl hover:bg-cyan-200"
          }
        >
          <Link prefetch="intent" to={"/robots"}>
            Robots intent
          </Link>
        </button>
      </div>
    </div>
  );
}
