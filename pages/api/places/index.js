/* import { places } from "../../../lib/db"; */
import dbConnect from "../../../db/connect.js";
import Places from "../../../db/models/Places.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Places.find();
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    console.log("POST REQUEST!");
    try {
      const placeData = request.body;
      console.log("placeData: ", placeData);
      await Places.create(placeData);
      response.status(201).json({ status: "Place created." });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
