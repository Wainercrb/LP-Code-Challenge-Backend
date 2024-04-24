import { Sequelize } from "sequelize";
import { development } from "@infrastructure/database/config";

export const sequelize = new Sequelize(development)