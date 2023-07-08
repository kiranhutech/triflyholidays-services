import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
const PORT = process.env.SERVER_PORT || 5000;
import v1_routes from "../routes/v1/route";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
// app.use(
//   session({
//     secret: "", // Replace with your own session secret
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(
//   "/docs",
//   swaggerUi.serve,
//   swaggerUi.setup(undefined, {
//     swaggerOptions: {
//       url: "/swagger.json",
//     },
//   })
// );

app.get("/api", (req, res) => {
  res.send({ message: "Welcome to My-Biz APIs!" });
});
app.use("/api/v1", v1_routes);
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
