import { MongoClient } from "mongodb";
const cliURL = process.env.MONGO_URI || "mongodb://localhost:27017";
const cli = new MongoClient(cliURL);
await cli.connect();
export const db = cli.db("club-deportes");
//# sourceMappingURL=connect.js.map