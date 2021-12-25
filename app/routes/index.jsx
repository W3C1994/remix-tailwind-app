import { Link } from "remix";

export function loader() {
  console.log(process.env.SESSION_SECRET);
  return {};
}

function StarWarRobots() {
  return (
    <div
      className={"flex flex-wrap"}
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
    >
      <Link
        to={"/robots"}
        className={
          "m-5 p-3 bg-blue-500 shadow-2xl shadow-indigo-400 rounded-2xl hover:bg-cyan-200"
        }
      >
        星際大戰與機器人
      </Link>
      <Link
        prefetch="intent"
        to={"/posts"}
        className={
          "m-5 p-3 bg-blue-500 shadow-2xl shadow-indigo-400 rounded-2xl hover:bg-cyan-200"
        }
      >
        預載 星際大戰人物資料
      </Link>
      <Link
        to={"/robots"}
        className={
          "m-5 p-3 bg-blue-500 shadow-2xl shadow-indigo-400 rounded-2xl hover:bg-cyan-200"
        }
      >
        星際大戰與機器人
      </Link>
      <Link
        prefetch="intent"
        to={"/robots"}
        className={
          "m-5 p-3 bg-blue-500 shadow-2xl shadow-indigo-400 rounded-2xl hover:bg-cyan-200"
        }
      >
        星際大戰與機器人-預載入
      </Link>
    </div>
  );
}

export default function Index() {
  return <StarWarRobots />;
}
