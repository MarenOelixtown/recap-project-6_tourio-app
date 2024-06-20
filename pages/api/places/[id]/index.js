/* import { places } from "../../../../lib/db.js"; */
import dbConnect from "../../../../db/connect.js";
import Places from "../../../../db/models/Places.js";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    /* const place = places.find((place) => place.id === id); */
    const place = await Places.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    response.status(200).json(place);
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
  }
}
