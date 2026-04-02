import { validateUserToken } from "../utils/token.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

export const authenticationMiddleware = async function (req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return next();
    }

    if (!authHeader.startsWith("Bearer")) {
      return res
        .status(400)
        .json({ error: "authorization header must start with Bearer" });
    }

    const [_, token] = authHeader.split(" "); // [Bearer, <TOKEN>]

    const payload = validateUserToken(token);
    req.user = payload;
    next();
  } catch (error) {
    next();
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

export function ensureAuthenticated(req, res, next) {
  if (!req.user || req.user.id) {
    return res
      .status(401)
      .json({ error: "You must be Logged In to access this resource" });
  }
  next();
}
