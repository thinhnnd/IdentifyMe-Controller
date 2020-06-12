import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    try {
        const isExisting = await knex.schema.hasTable('student');
        if (!isExisting)
            await knex.schema.createTable("student", table => {
                table
                    .increments('id')
                    .unsigned()
                    .primary();

                table
                    .integer("user_id")
                    .references('user.id')
                    .onUpdate('CASCADE')
                    .onDelete('CASCADE')
                    .notNullable()
                table.string("connection_id")
                table.string("student_id").notNullable();
                table.date("graduated_date")
                table.string("grade")
                table.string("major")
                table.integer("issued_time")
                table.string("faculty")

            })
    } catch (error) {
        console.log(error);
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('student');
}

