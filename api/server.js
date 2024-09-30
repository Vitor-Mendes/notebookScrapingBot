import { getNotebooks } from "./index.js";
import express from "express";
import cors from "cors";
// import { getAllLenovoNotebooks } from "./controllers/notebooksController.js";
import { connect } from "./config/database.js";
// import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/notebooks", async function (req, res) {
  const notebooks = await getNotebooks();
  res.json(notebooks);
});

app.get("/getlenovonotebooks", async function (req, res) {
  const client = await connect();
  const response = await client.query('SELECT * FROM notebooks');
	res.status(200).json(response.rows);
});

app.listen(5000, () => console.log(`Servidor iniciado na porta 5000`));
