// Entrypoint for API
import express from 'express';

const app = express();

app.get("/recipes", (req, res) => {
    res.send("Server is ready.")
})

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
})