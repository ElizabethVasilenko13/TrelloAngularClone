import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user";
import { UserDocument } from "../types/user.interface";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import { secret } from "../config";
import { ExpressRequestInterface } from "../types/expressRequest.interface";

const normalizeUser = (user: UserDocument) => {
  const {email, username, id} = user;
  const token = jwt.sign({id, email}, secret)
  return { email, username, id, token: `Bearer ${token}`}
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username, password } = req.body
    const newUser = new UserModel({
      email, username, password
    });
    const savedUser = await newUser.save();
    res.send(normalizeUser(savedUser));
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      const messages = Object.values(err.errors).map(err => err.message);
      return res.status(422).json(messages)
    }
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select('+password');
    const errors = {
      emailOrPassword: 'Incorrect email or password'
    }
    if (!user) {
      return res.status(422).json(errors)
    }

    const isTheSamePassword = await user.validatePassword(password);

    if (!isTheSamePassword) {
      return res.status(422).json(errors)
    }

    res.send(normalizeUser(user))
  } catch (err) {
    next(err);
  }
};


export const currentUser = async(
  req: ExpressRequestInterface,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401);
  }
  res.send(normalizeUser(req.user))
};