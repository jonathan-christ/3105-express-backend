import type { Request, Response } from "express";
import { UserModel, User } from "../models/usersModel.ts";
import { env } from "../config/env.ts";
import Joi from "joi";
import jwt from "jsonwebtoken";

export class UserController extends UserModel {
  private readonly loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });

  private readonly registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }).required(),
  });


  public login = (req: Request, res: Response): void => {
    const { error, value } = this.loginSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message, data: req.body });
      return;
    }

    const user = this.getUserByDetails(value.username, value.password);

    if (!user) {
      res.status(400).json({ message: "Invalid credentials." });
      return;
    }

    const token = jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email
    },
      env.JWT_SECRET
    );

    res.status(200).json({ message: 'Login successful!', token });
  };

  public register = (req: Request, res: Response): void => {
    const { error, value } = this.registerSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
    }

    const user = this.createUser(value.username, value.password, value.email);

    if (!user) {
      res.status(400).json({ message: "Registration failed!" });
      return;
    }

    res.status(200).json({ message: "Registration successful!", data: user });
  }

  public profile = (_: Request, res: Response) => {
    const user = this.getUserById((res.locals.token as User).id);
    if (!user) {
      res.status(400).json({ message: "User not found?!" });
    }

    res.status(200).json({ message: "User found!", data: user });
  }
}