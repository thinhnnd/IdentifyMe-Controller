import * as Knex from "knex";
import * as faker from "faker";
import { hashSync, genSaltSync } from "bcrypt";

const roles = ["admin", "student"];

const createFakeUser = (salt: string) => {
  return {
    username: faker.internet.userName(),
    password: hashSync('Aa!@#123', salt),
    salt,
    // role: roles[Math.floor(Math.random() * roles.length)],
    email: faker.internet.email(),
    fullname: faker.name.firstName() + ' ' + faker.name.lastName(),
    birthday: faker.date.past(1998),
  }
}
export async function seed(knex: Knex): Promise<any> {
  await knex("user").del();
  const fakeUser = [];
  const desiredFakes = 50;
  for (let i = 0; i < desiredFakes; i++) {
    const salt = genSaltSync();
    const user = createFakeUser(salt)
    fakeUser.push(user);
  }
  knex('user').insert(fakeUser)
    .then((users) => {
      console.log("users", users.length)
    })
    .catch(err => console.log(err))

};
