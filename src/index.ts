import app from "./app";
import "./database";
import './modules/integrationMarvelApi/cron/index';

app.listen(app.get("port"));
console.log("Server on port ", app.get("port"));
