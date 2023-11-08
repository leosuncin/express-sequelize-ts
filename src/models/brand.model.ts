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

export type BrandInput = Omit<
  CreationAttributes<Brand>,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type BrandOutput = Attributes<Brand>;

export class Brand extends Model<
  InferAttributes<Brand>,
  InferCreationAttributes<Brand>
> {
  public declare id: CreationOptional<number>;

  public declare name: string;

  public declare createdAt: CreationOptional<Date>;

  public declare updatedAt: CreationOptional<Date>;

  public declare deletedAt: CreationOptional<Date>;
}

Brand.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
    timestamps: true,
    tableName: 'brands',
  },
);
