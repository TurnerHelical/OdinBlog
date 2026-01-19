import { config } from './config/env.js'
import app from "./app.js";


const port = config.port;
app.listen(port, () => {
    console.log(`running on ${port}`);
});