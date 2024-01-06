import { type Optional } from 'sequelize'
import bcrypt from 'bcryptjs'
import { BeforeSave, Column, Model, Table } from 'sequelize-typescript'

interface UserAttributes {
  id: number
  email: string
  password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table
class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column
    email!: string

  @Column
    password!: string

  @BeforeSave
  static async hashPassword (instance: User) {
    instance.password = await bcrypt.hash(instance.password, 10)
  }
}

export default User
