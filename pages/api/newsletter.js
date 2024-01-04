// import { MongoClient } from "mongodb";

// async function handler(req, res) {
//   if (req.method === "POST") {
//     const userEmail = req.body.email;

//     if (!userEmail || !userEmail.includes("@")) {
//       res.status(422).json({ message: "Invalid email address." });
//       return;
//     }

//     const client = await MongoClient.connect(
//       "mongodb+srv://punithrajkumar496:Punithrajkumar@cluster0.svqeffc.mongodb.net/newsletter?retryWrites=true&w=majority"
//     );
//     const db = client.db();

//     await db.collection("emails").insertOne({ email: userEmail });

//     client.close();

//     res.status(201).json({ message: "Signed up successfully." });
//   }
// }

// export default handler;

import { connectDatabase, insertDocument } from "@/helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up successfully." });
  }
}

export default handler;
