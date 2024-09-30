import { getNotebooks } from "./server.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/notebooks", async function (req, res) {
  const notebooks = await getNotebooks();
  res.json(notebooks);
});

// app.get("/", function(req, res) {
//   rp(someURL).then(result => {
//       // do some processing of result into finalData
//       res.send(finalData);
//   }).catch(err => {
//       console.log(err);
//       res.sendStatus(501);
//   });
// });

app.listen(5000, () => console.log(`Servidor iniciado na porta 5000`));
