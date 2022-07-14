const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const audio = require("./routes/audioRouter");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static("build"));

app.use("/audio", audio);

app.listen(PORT, () => {
  console.log("listening on port: ", PORT);
});
