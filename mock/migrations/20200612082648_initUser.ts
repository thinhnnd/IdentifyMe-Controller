import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  try {
    const isExisting = await knex.schema.hasTable('user');
    if (!isExisting)
      await knex.schema.createTable("user", table => {
        table
          .increments('id')
          .unsigned()
          .primary();

        table
          .string('username')
          .unique()
          .notNullable();

        table
          .string('email')
          .unique()
          .notNullable();

        table
          .string('password')
          .notNullable();

        table
          .string('fullname')
          .notNullable();

        table
          .string('salt')
          .notNullable();

        table.date('birthday')
        table.string('role').defaultTo("user")
      })
  } catch (error) {
    console.log(error);
  }
}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('user');
}

