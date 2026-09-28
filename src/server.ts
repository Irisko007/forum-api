import express from "express";
import postRouter from "./transport/routers/post.router.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/posts", postRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Маршрут не знайдено" });
});

app.listen(port, () => {
  console.log(`Сервер запущений: http://localhost:${port}`);
});
