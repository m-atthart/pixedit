import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use("/static", express.static(path.join(__dirname, "algs")));

app.get("/", (req, res) => {
	return res.sendFile(`${__dirname}/algs/imgView.html`);
});

const port = 3000;
app.listen(
	port,
	console.log(`listening on port ${port} (http://localhost:3000/)`)
);
