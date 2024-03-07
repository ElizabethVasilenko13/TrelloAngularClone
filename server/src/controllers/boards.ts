import { NextFunction, Request, Response } from "express";
import BoardModel from '../models/board';
import { ExpressRequestInterface } from '../types/expressRequest.interface';

export const getBoards = async (
  req: ExpressRequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401);
    }
    const boards = await BoardModel.find({userId: req.user.id });
    res.send(boards);
  } catch (err) {
    next(err);
  }
}

export const cretateBoard = async (
  req: ExpressRequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401);
    }

    console.log(

      'f'
    );
    
    const { title } = req.body;
    const board = new BoardModel({title, userId: req.user.id})
    const savedBoard = await board.save();
    res.send(savedBoard);
  } catch (err) {
    next(err);
  }
}