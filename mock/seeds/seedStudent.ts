import * as Knex from "knex";
import * as _ from "lodash";
const createStudentsFake = (user_id: number) => ({
    user_id,
    connection_id: null,
    student_id: '1652' + Math.floor(1000 + Math.random() * 9000).toString(),
    graduated_date: null,
    grade: "ATTT2016",
    major: "MMTT",
    issued_time: 0,
    faculty: null
})
export async function seed(knex: Knex, user_ids: [{ id: number }]): Promise<any> {
    // Deletes ALL existing entries
    await knex("student").del();
    const fakeUser = [];
    const desiredFakes = 30;
    for (let i = 0; i < desiredFakes; i++) {
        const user_id = _.sample(user_ids).id
        _.remove(user_ids, { id: user_id });
        const student = createStudentsFake(user_id)
        fakeUser.push(student);
    }
    console.log("fakeUser", fakeUser.length);

    await knex("student").insert(fakeUser);
};
