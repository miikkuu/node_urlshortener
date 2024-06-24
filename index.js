const express = require("express");
const connectToMongoDB = require("./connection.js");
const cookieparser = require("cookie-parser");
const path = require("path");


const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const { handleGenerateNewShortUrl } = require("./controllers/url.js");
const { restrictTo, checkAuth } = require("./middlewares/auth");
const app = express(); 
const PORT = 3000;


//connect to mongodb at 27017 and error out if not connected 
 connectToMongoDB("mongodb://localhost:27017/urlshortner").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
    process.exit(1);
});





app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded());
app.use(checkAuth);

app.set("view engine", "ejs");
app.set("views", "./views");


//Routes 
app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));