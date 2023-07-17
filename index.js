import express from "express";
import { routes } from "./src/routes/api.js";

const app = express();
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, (err) => {
    if(err) {
        return console.log('> Something bad happened...', err)
    }
    console.log(`> Server is running on port ${port}`)
});
