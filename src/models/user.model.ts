import { hash, verify } from 'argon2';
import {
  type Attributes,
  type CreationAttributes,
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelizeConnection } from '@/config/sequelize';

export type UserInput = Omit<
  CreationAttributes<User>,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type UserOutput = Attributes<User>;

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  public declare id: CreationOptional<number>;

  public declare email: string;

  public declare password: string;

  public declare createdAt: CreationOptional<Date>;

  public declare updatedAt: CreationOptional<Date>;

  public declare deletedAt: CreationOptional<Date>;

  public verifyPassword(plainPassword: string): Promise<boolean> {
    return verify(this.password, plainPassword);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      async set(value: string) {
        this.setDataValue('password', await hash(value));
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
    timestamps: true,
    tableName: 'users',
    /* hooks: {
      async beforeCreate(user) {
        // eslint-disable-next-line require-atomic-updates
        user.password = await hash(user.password);
      },
      async beforeUpdate(user) {
        if (user.changed('password')) {
          // eslint-disable-next-line require-atomic-updates
          user.password = await hash(user.password);
        }
      }
    }, */
  },
);
