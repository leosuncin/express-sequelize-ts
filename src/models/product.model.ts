import {
  type Attributes,
  type CreationAttributes,
  type CreationOptional,
  DataTypes,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
  type NonAttribute,
} from 'sequelize';

import { sequelizeConnection } from '@/config/sequelize';
import { Brand } from '@/models/brand.model';
import { Category } from '@/models/category.model';

export type ProductInput = Required<
  Omit<
    CreationAttributes<Product>,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > & { brandId: Brand['id']; categoryId: Category['id'] }
>;

export type ProductOutput = Attributes<Product>;

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  public declare id: CreationOptional<number>;

  public declare name: string;

  public declare listPrice: number;

  public declare modelYear: number;

  public declare brandId: ForeignKey<Brand['id']>;

  public declare brand: NonAttribute<Brand>;

  public declare categoryId: ForeignKey<Category['id']>;

  public declare category: NonAttribute<Category>;

  public declare createdAt: CreationOptional<Date>;

  public declare updatedAt: CreationOptional<Date>;

  public declare deletedAt: CreationOptional<Date>;
}

Product.init(
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
    listPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    modelYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1900,
        max: new Date().getFullYear() + 1,
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
    tableName: 'products',
  },
);

Product.belongsTo(Brand, {
  targetKey: 'id',
  foreignKey: 'brandId',
  as: 'brand',
});

Product.belongsTo(Category, {
  targetKey: 'id',
  foreignKey: 'categoryId',
  as: 'category',
});
