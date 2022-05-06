const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
import { Request, Response } from "express";
import { type } from "os";

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
let users = require("./userList");

const port: number = 5000;

const save = () => {
  fs.writeFile(
    "./userList.json",
    JSON.stringify(users, null, 2),
    (error: any) => {
      if (error) {
        throw error;
      }
    }
  );
};

app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

app.get("/users/:name", (req: Request, res: Response) => {
  const findUser = users.find((user: any) => user.name === req.params.name);
  res.json(findUser);
});

app.post("/users", bodyParser.json(), (req: Request, res: Response) => {
  users.push(req.body);
  console.log(req.body);
  save();
  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

app.listen(port, () => {
  console.log(`server is on on port: ${port}`);
});
