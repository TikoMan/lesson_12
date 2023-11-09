import HttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { Op } from 'sequelize';
import { Users } from '../models/index';

const { JWT_SECRET, RECAPTCHA_SECRET } = process.env;

class UserController {
  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({
        where: {
          email,
          password: Users.passwordHash(password),
        },
      });

      if (!user) {
        throw HttpError(422, 'Invalid email or password');
      }

      const token = jwt.sign({ userID: user.id }, JWT_SECRET);

      res.send({
        status: 'ok',
        user,
        token,
      });
    } catch (e) {
      next(e);
    }
  };

  static register = async (req, res, next) => {
    try {
      const {
        email, password, firstName, lastName, token,
      } = req.body;

      let user = await Users.findOne({
        where: {
          email,
        },
      });

      const { data: { success } } = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
        params: {
          secret: RECAPTCHA_SECRET,
          response: token,
        },
      });

      if (!success) {
        throw HttpError(401, {
          errors: {
            robot: 'It Is a Robot',
          },
        });
      }

      if (user) {
        throw HttpError(422, {
          errors: {
            email: 'Email Is Busy',
          },
        });
      }

      user = await Users.create({
        email,
        password,
        firstName,
        lastName,
      });

      res.send({
        status: 'ok',
        user,
      });
    } catch (e) {
      next(e);
    }
  };

  static auth = async (req, res, next) => {
    try {
      const { email, firstName, lastName } = req.body;

      let user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        user = await Users.create({
          email,
          password: firstName + lastName,
          firstName,
          lastName,
        });
      }
      const token = jwt.sign({ userID: user.id }, JWT_SECRET);
      res.send({
        status: 'ok',
        user,
        token,
      });
    } catch (e) {
      next(e);
    }
  };

  static list = async (req, res, next) => {
    try {
      const { s, limit = 10, page = 1 } = req.query;

      const where = {};

      if (s) {
        where[Op.or] = [
          { firstName: { [Op.substring]: s } },
          { lastName: { [Op.substring]: s } },
          { email: { [Op.substring]: s } },
        ];
      }

      const usersList = await Users.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
      });

      const total = await Users.count({
        where,
      });

      const totalPages = Math.ceil(total / limit);

      res.send({
        status: 'ok',
        usersList,
        totalPages,
        total,
        limit,
        page,
      });
    } catch (e) {
      next(e);
    }
  };
}

export default UserController;
