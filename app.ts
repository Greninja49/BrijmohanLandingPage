import express from "express";
import path from "path";
import router from "./router/app.route";

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.use("/", router);

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
