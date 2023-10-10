import { Request, Response } from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};