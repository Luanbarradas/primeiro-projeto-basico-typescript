import { Request, Response } from "express";
import { knex } from "../database/connection";

// forma de tratar o erro, no entanto não é ideal por retornar informações sensiveis
// type Erro = {
//   message: string;
// };

// export const listCars = async (_: Request, res: Response) => {
//   try {
//     const cars = await knex("carros");
//   } catch (error) {
//     const erro = error as Erro;
//     return res.status(400).json({ message: erro.message });
//   }
// };

// quando um parâmetro não for usado, por convenção deve-se colocar "_" no lugar
export const listCars = async (_: Request, res: Response) => {
  try {
    const cars = await knex("carros");
    return res.json(cars);
  } catch {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const detailCars = async (req: Request, res: Response) => {};

export const registerCars = async (req: Request, res: Response) => {};

export const updateCars = async (req: Request, res: Response) => {};

export const deleteCars = async (req: Request, res: Response) => {};
