const express = require('express');
const db = require('./models');
const cors = require('cors');
 const app = express();
 app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const userRoute = require("./routes/userRoute")
app.use("/api/v1/job", userRoute);
 const port = process.env.PORT || 8000;
 db.sequelize.sync().then(() => {
    app.listen(8000, () => {
      console.log(`SERVER RUNNING ON PORT ${port}`);
    }); 
  });
  