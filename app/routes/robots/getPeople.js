import axios from "axios";

export const getPeople = async () => {
  const people = await axios.get("https://swapi.dev/api/people/");

  return people.data;
};
