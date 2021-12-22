import { useLoaderData } from "remix";
import { getPeople } from "~/routes/posts/getPeople";

export const loader = async () => {
  return getPeople();
};

export default function Posts() {
  const posts = useLoaderData();
  console.log(posts);
  return (
    <div>
      <h1>postsStarWar</h1>
      <ul>
        <li>name: {posts.name}</li>
        <li>height: {posts.height}</li>
        <li>mass: {posts.mass}</li>
        <li>hair_color: {posts.hair_color}</li>
        <li>skin_color: {posts.skin_color}</li>
        <li>eye_color: {posts.eye_color}</li>
        <li>birth_year: {posts.birth_year}</li>
        <li>gender: {posts.gender}</li>
        <li>homeworld: {posts.homeworld}</li>
        <li>
          films:{" "}
          {posts.films.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </li>
        <li>
          films:{" "}
          {posts.species.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </li>
        <li>
          films:{" "}
          {posts.vehicles.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </li>
        <li>
          films:{" "}
          {posts.starships.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </li>
        <li>created: {posts.created}</li>
        <li>edited: {posts.edited}</li>
        <li>url: {posts.url}</li>
      </ul>
    </div>
  );
}
