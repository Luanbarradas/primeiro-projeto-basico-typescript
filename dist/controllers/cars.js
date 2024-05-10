"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCars = exports.updateCars = exports.registerCars = exports.detailCars = exports.listCars = void 0;
const connection_1 = require("../database/connection");
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
const listCars = async (_, res) => {
    try {
        const cars = await (0, connection_1.knex)("carros");
        return res.json(cars);
    }
    catch (_a) {
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};
exports.listCars = listCars;
const detailCars = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await (0, connection_1.knex)("carros")
            .where({ id: Number(id) })
            .first();
        if (!car) {
            return res.status(404).json({ message: "Carro não encontrado." });
        }
        return res.json(car);
    }
    catch (_a) {
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};
exports.detailCars = detailCars;
// não terá validação de campos
const registerCars = async (req, res) => {
    const { marca, modelo, cor, ano, valor } = req.body;
    try {
        const car = await (0, connection_1.knex)("carros")
            .insert({
            marca,
            modelo,
            cor,
            ano,
            valor,
        })
            .returning("*");
        return res.status(201).json(car[0]);
    }
    catch (_a) {
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};
exports.registerCars = registerCars;
const updateCars = async (req, res) => {
    const { id } = req.params;
    const { marca, modelo, cor, ano, valor } = req.body;
    try {
        const car = await (0, connection_1.knex)("carros")
            .where({ id: Number(id) })
            .first();
        if (!car) {
            return res.status(404).json({ message: "Carro não encontrado." });
        }
        await (0, connection_1.knex)("carros")
            .where({ id: Number(id) })
            .update({
            marca,
            modelo,
            cor,
            ano,
            valor,
        });
        return res.status(204).send();
    }
    catch (_a) {
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};
exports.updateCars = updateCars;
const deleteCars = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await (0, connection_1.knex)("carros")
            .where({ id: Number(id) })
            .first();
        if (!car) {
            return res.status(404).json({ message: "Carro não encontrado." });
        }
        await (0, connection_1.knex)("carros")
            .where({ id: Number(id) })
            .del();
        return res.status(204).send();
    }
    catch (_a) {
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};
exports.deleteCars = deleteCars;
