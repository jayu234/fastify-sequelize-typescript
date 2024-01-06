/* eslint-disable n/no-path-concat */
import { Sequelize } from 'sequelize-typescript'
import User from './user.model'

const sequelize = new Sequelize({
  database: 'task4_development',
  dialect: 'mysql',
  username: 'root',
  password: '',
  port: 3306,
  logging: false,
  models: [User]
})

export default sequelize
