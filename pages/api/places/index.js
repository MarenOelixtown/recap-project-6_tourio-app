/* import { places } from "../../../lib/db"; */
import dbConnect from "../../../db/connect.js";
import Places from "../../../db/models/Places.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Places.find();
    return response.status(200).json(places);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
