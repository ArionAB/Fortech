import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
const { readFileSync, writeFileSync } = require("fs");

console.log(readFileSync("./test.ts", "utf8"));
writeFileSync("./test.ts", "I wrote his");
const port: number = 5000;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

interface IUser {
  name: string;
  password: any;
}

let users: IUser[] = [];

/* fs.readFile("users.ts", "utf8", (err: any, data: any) => {
  console.log(data);
});

fs.writeFile("users.ts", users.toString(), (err: any) => {
  console.log(users.toString());
  console.log("data saved");
}); */

app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

//for some reason my post didn't work without X-www-form-urlencoded in content-type in Postman
app.post("/users", (req: Request, res: Response) => {
  const user = { name: req.body.name, password: req.body.password };
  users.push(user);
  res.status(201);
  res.send(`${req.body.name}'s account has been created.`);
});
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
