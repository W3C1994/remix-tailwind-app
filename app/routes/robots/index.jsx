import { useLoaderData } from "remix";
import { getPeople } from "~/routes/robots/getPeople";
import { requireUserId } from "~/utils/session.server";

export const loader = async ({ request }) => {
  const userId = await requireUserId(request, "/robots");
  return getPeople();
};

export default function Robots() {
  const people = useLoaderData();
  return (
    <div className={"flex flex-wrap"}>
      {people.results.map((people, index) => (
        <div
          key={index}
          className={"m-5 bg-gray-400 border-2 border-b-gray-600"}
        >
          <img alt="robot" src={`https://robohash.org/${index}`} />
          <h2>name: {people.name}</h2>
          <p>height: {people.height}</p>
          <p>birth_year: {people.birth_year}</p>
        </div>
      ))}
    </div>
  );
}
