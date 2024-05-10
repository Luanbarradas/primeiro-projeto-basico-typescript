import { Request, Response } from "express";
import { knex } from "../database/connection";
import { Car } from "../types";

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
    const cars = await knex<Car>("carros");
    return res.json(cars);
  } catch {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const detailCars = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const car = await knex<Car>("carros")
      .where({ id: Number(id) })
      .first();

    if (!car) {
      return res.status(404).json({ message: "Carro não encontrado." });
    }

    return res.json(car);
  } catch {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// não terá validação de campos
export const registerCars = async (req: Request, res: Response) => {
  const { marca, modelo, cor, ano, valor } = req.body;
  try {
    const car = await knex<Omit<Car, "id">>("carros")
      .insert({
        marca,
        modelo,
        cor,
        ano,
        valor,
      })
      .returning("*");

    return res.status(201).json(car[0]);
  } catch {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const updateCars = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { marca, modelo, cor, ano, valor } = req.body;
  try {
    const car = await knex<Car>("carros")
      .where({ id: Number(id) })
      .first();

    if (!car) {
      return res.status(404).json({ message: "Carro não encontrado." });
    }

    await knex<Car>("carros")
      .where({ id: Number(id) })
      .update({
        marca,
        modelo,
        cor,
        ano,
        valor,
      });

    return res.status(204).send();
  } catch {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const deleteCars = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const car = await knex<Car>("carros")
      .where({ id: Number(id) })
      .first();

    if (!car) {
      return res.status(404).json({ message: "Carro não encontrado." });
    }

    await knex<Car>("carros")
      .where({ id: Number(id) })
      .del();

    return res.status(204).send();
  } catch {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};
