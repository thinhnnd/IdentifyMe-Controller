import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    try {
        const isExisting = await knex.schema.hasTable('admin');
        if (!isExisting)
            await knex.schema.createTable("admin", table => {
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

            })
    } catch (error) {
        console.log(error);
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('admin');
}

