import { DataTypes, Model } from 'sequelize';
import md5 from 'md5';
import sequelize from '../services/sequelize';

const { PASSWORD_SECRET } = process.env;

class Users extends Model {
  static passwordHash(string) {
    return md5(md5(string) + PASSWORD_SECRET);
  }
}

Users.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: 'email',
  },
  password: {
    type: DataTypes.STRING(),
    allowNull: false,
    set(val) {
      if (val) {
        this.setDataValue('password', Users.passwordHash(val));
      }
    },
    get() {
      return undefined;
    },
  },
  avatar: {
    type: DataTypes.STRING,
    get() {
      const avatar = this.getDataValue('avatar');

      if (avatar) {
        return avatar;
      }

      const email = this.getDataValue('email');
      return `https://gravatar.com/avatar/${md5(email)}?d=monsterid`;
    },
  },
}, {
  modelName: 'users',
  tableName: 'users',
  sequelize,
});

export default Users;
