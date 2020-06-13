import { AuthCredentialsDto } from "../dtos/credential.dto";
import { getRepository } from "typeorm";
import { sign, verify } from "jsonwebtoken";
import { User } from "../entity/user.entity";
import { Student } from "../entity/student.entity";
import { Admin } from "../entity/admin.entity";
import { JWTPayload } from "../dtos/jwt-payload.dto";
import { hashSync, compareSync } from "bcrypt";

export class AuthService {
  private studentRepository = getRepository(Student);
  private adminRepository = getRepository(Admin);

  private async getUserByCredentials(authCredentials: AuthCredentialsDto) {
    let userFound = null;
    let error = null;
    if (authCredentials.username.startsWith('1652')) {
      const query = this.studentRepository.createQueryBuilder("student");
      query
        .select("*")
        .innerJoin("user", "user", "student.user_id = user.id")
        .where("student.student_id = :student_id", { student_id: authCredentials.username })
      const found = await query.getRawOne();
      console.log("AuthController -> login -> found", found);
      if (found) {
        const match = compareSync(authCredentials.password, found['password']);
        if (match) {
          delete found["password"];
          delete found["salt"];
          // res.json(found);
          userFound = found;
        }
        else error = { error: "Credentials provided is invalid" }
      }
      else throw ({ error: "Credentials provided is invalid" })
    }
    else {
      const found = await this.adminRepository
        .createQueryBuilder('admin')
        .select('*')
        .innerJoin("user", "user", "admin.user_id = user.id")
        .where("user.username = :username", { username: authCredentials.username })
        .getRawOne()
      if (found) {
        const match = compareSync(authCredentials.password, found['password']);
        if (match) {
          delete found["password"];
          delete found["salt"];
          // res.json(found);
          userFound = found;
        }
        else error = { error: "Credentials provided is invalid" }
      }
      else throw { error: "Credentials provided is invalid" };
    }

    if (!userFound) throw { error: "Credentials provided is invalid" };
    return userFound;
  }

  private async createToken(payload: JWTPayload) {
    const token = sign(payload, process.env.SECRET, { expiresIn: '7d' });
    return token;
  }

  public async login(authCredentials: AuthCredentialsDto) {
    try {
      const user = await this.getUserByCredentials(authCredentials);
      console.log("AuthService -> login -> user", user);
      const payload: JWTPayload = {
        id: user.id,
        username: user.username,
        role: user.role
      }
      const token = await this.createToken(payload);
      return {
        access_token: token,
        ...payload
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}