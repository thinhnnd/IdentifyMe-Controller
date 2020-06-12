import { Request, Response, NextFunction } from "express";
import { JWTPayload } from "../dtos/jwt-payload.dto";
import { verify } from "jsonwebtoken";


export default function checkLoginJWT(req: Request, res: Response, next: NextFunction) {
  try {
    const bearerToken = <string>req.headers["authorization"];
    const token = bearerToken.split("Bearer ")[1];
    if (!token) return res.status(401).send({ error: "Invalid Bearer Token" });
    let jwtPayload: JWTPayload;

    jwtPayload = <JWTPayload>verify(token, process.env.SECRET);
    res.locals.user = jwtPayload;
  } catch (error) {
    res.status(401).send({ error: "Invalid JWT token" });
    return;
  }
  next();
}