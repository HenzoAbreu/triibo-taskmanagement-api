const express = require("express");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

const authRoutes = require("./router/auth.routes");
const userRoutes = require("./router/user.routes");
const taskRoutes = require("./router/task.routes");

const errorMiddleware = require("./router/middleware/error.middleware");
const authMiddleware = require("./router/middleware/auth.middleware");



const dotenv = require("dotenv");

dotenv.config();
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

//************************
//****** server config ***
//************************
app.use(cors({origin:"*"}))
app.use(express.json());

//************************
//******** routes ********
//************************
app.use("/auth", authRoutes);
app.use("/user", authMiddleware, userRoutes);
app.use("/task", authMiddleware, taskRoutes);

app.use(errorMiddleware);

app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
