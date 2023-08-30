const express = require('express');
const db = require('./models');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const userRoute = require("./routes/userRoute");
const resumeRoute = require("./routes/resumeRoute");
const {errorHandler} = require("./middlewares/errorHandler");
const postRoute = require("./routes/postRoute");
app.use("/api/v1/job", userRoute);
app.use("/api/v1/job", resumeRoute);
app.use("/api/v1/job", postRoute);
app.use(errorHandler);
const port = process.env.PORT || 8000;
db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`); 
  });
});
