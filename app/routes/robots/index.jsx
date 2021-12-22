import { useLoaderData } from "remix";
import { getPeople } from "~/routes/robots/getPeople";

export const loader = () => {
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
