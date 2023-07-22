"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.SERVER_PORT || 5000;
const route_1 = __importDefault(require("../routes/v1/route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.static("public"));
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
app.use("/api/v1", route_1.default);
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
