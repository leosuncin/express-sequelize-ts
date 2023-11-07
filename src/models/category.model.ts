import { DataTypes, Model, type Optional } from 'sequelize';

import { sequelizeConnection } from '@/config/sequelize';

type CategoryAttributes = {
  id: number;
  name: string;
};

export type CategoryInput = Optional<CategoryAttributes, 'id'>;

export type CategoryOutput = Required<CategoryAttributes>;

export class Category
  extends Model<CategoryAttributes, CategoryInput>
  implements CategoryAttributes
{
  public declare id: number;

  public declare name: string;
}

Category.init(
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
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
    modelName: 'category',
  },
);
