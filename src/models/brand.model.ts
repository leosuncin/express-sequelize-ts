import { DataTypes, Model, type Optional } from 'sequelize';

import { sequelizeConnection } from '@/config/sequelize';

type BrandAttributes = {
  id: number;
  name: string;
};

export type BrandInput = Optional<BrandAttributes, 'id'>;

export type BrandOutput = Required<BrandAttributes>;

export class Brand
  extends Model<BrandAttributes, BrandInput>
  implements BrandAttributes
{
  public declare id: number;

  public declare name: string;
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
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
    modelName: 'brand',
  },
);
