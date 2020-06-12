import * as async from "async";
import * as Knex from "knex";

import { seed as seedUser } from "./seedUser";
import { seed as seedStudent } from "./seedStudent";
import { seed as seedAdmin } from "./seedAdmin";
import { result } from "lodash";

const databaseName = "identifyme";
const migrationsDir = __dirname + "/mock/migrations";

const knex = Knex({
  client: "postgresql",
  connection: `postgres://postgres:abc123@localhost:5432/${databaseName}`,
  migrations: {
    directory: migrationsDir
  },
  seeds: {
    directory: "."
  },
});

function seedUsers(callback: Function) {
  console.log("Starting seed users");

  seedUser(knex)
    .then(() => knex.table('user').select('id'))
    .then((users: [{ id: number }]) => callback(null, users))
    .catch(err => callback(err, []));
}
function seedStudents(user_ids: [{ id: number }], callback: Function) {
  console.log("Starting seed students")
  seedStudent(knex, user_ids)
    .then(() => knex.table('student').select('id'))
    .then((students: [{ id: number }]) => {
      // knex.table("user").update()
      callback(null, user_ids, students)
    })
    .catch(err => callback(err, [], []));
}
function seedAdmins(user_ids: [{ id: number }], student_ids: [{ id: number }], callback: Function) {
  console.log("Starting seed admins");
  seedAdmin(knex, user_ids, student_ids)
    .then(() => callback(null, true))
    .catch(err => callback(err, false));
}

export async function runSeed(): Promise<void> {
  async.waterfall([
    seedUsers,
    seedStudents,
    seedAdmins
  ], (err, isComplete: boolean) => {
    if (isComplete) {
      async.parallel([
        () => {
          knex.select("user_id").from("student").then((student_ids: [{ user_id: number }]) => {
            const std = student_ids.map(u => u.user_id);
            knex('user').update({ role: "student" }).whereIn('id', std).then((s) => {
              console.log("Update student role completed");
            })
          })
        },
        () => {
          knex.select("user_id").from("admin").then((admin_ids: [{ user_id: number }]) => {
            const ids = admin_ids.map(u => u.user_id);
            knex('user').update({ role: "admin" }).whereIn('id', ids).then((s) => {
              console.log("Update admin role completed");
            })
          });
        }
      ], (err, result) => {
        if (err) {
          process.exit(1)
        };
        console.log("Completed");
        process.exit(0)
      })
    }
  })
}
runSeed();