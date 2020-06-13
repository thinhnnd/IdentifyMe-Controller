import { IBaseController } from "../interface";
import { Request, Response, Router } from 'express';
import { AuthCredentialsDto } from "../dtos/credential.dto";
import { AuthService } from "../services/auth.service";
import { error } from "console";
import checkLoginJWT from "../middlewares/check-login.middleware";

export class AuthController implements IBaseController {
  public path = '/';
  public router = Router();
  private authService: AuthService
  constructor() {
    this.initRoutes();
    this.authService = new AuthService();
  }

  initRoutes() {
    this.login();
    this.testMiddlewares()
  }

  private async login() {
    this.router.post('/login', async (req, res) => {
      const user: AuthCredentialsDto = req.body;
      try {
        const data = await this.authService.login(user);
        res.json(data);
      } catch (error) {
        res.status(401).json(error)
      }
    })
  };
  private async testMiddlewares() {
    this.router.get("/test", checkLoginJWT, (req, res) => {
      res.send("OK");
    })
  }
}