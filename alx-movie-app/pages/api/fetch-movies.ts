import { MoviesProps } from "@/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    const { year, page, genre } = request.body;
    const date = new Date();

    try {
      const resp = await fetch(
        `https://moviesdatabase.p.rapidapi.com/titles?
        year=${year || date.getFullYear()}&
        sort=year.decr&limit=12&
        page=${page || 1}
        ${genre ? `&genre=${genre}` : ""}`,
        {
          headers: {
            "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
            "x-rapidapi-key": process.env.MOVIE_API_KEY || "",
          },
        }
      );

      if (!resp.ok) {
        return response
          .status(resp.status)
          .json({ error: "Failed to fetch movies" });
      }

      const moviesResponse = await resp.json();
      const movies: MoviesProps[] = moviesResponse.results;

      return response.status(200).json({ movies });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    response.setHeader("Allow", ["POST"]);
    return response
      .status(405)
      .end(`Method ${request.method} Not Allowed in here`);
  }
}