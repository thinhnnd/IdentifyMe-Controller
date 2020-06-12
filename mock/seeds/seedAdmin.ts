import * as Knex from "knex";
import * as _ from "lodash";
const createAdminFakes = (user_id: number) => ({
  user_id
})
export async function seed(knex: Knex, user_ids: [{ id: number }], student_ids: [{ id: number }]): Promise<any> {
  // Deletes ALL existing entries
  await knex("admin").del();
  const fakeUser = [];
  const user_ids_left = _.filter(user_ids, user => {
    return !_.includes(student_ids, { id: user.id })
  });
  if (user_ids_left.length === 0) throw new Error("All user are students")
  const desiredFakes = 5;
  for (let i = 0; i < desiredFakes; i++) {
    const user_id = _.sample(user_ids_left).id
    _.remove(user_ids_left, { id: user_id });
    const student = createAdminFakes(user_id)
    fakeUser.push(student);
  }
  await knex("admin").insert(fakeUser)

};
