import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    try {
        const isExisting = await knex.schema.hasTable('applicant');
        if (!isExisting)
            await knex.schema.createTable("applicant", table => {
                table
                    .increments('id')
                    .unsigned()
                    .primary();
                table.string("connection_id")
                table.string("name"); 
                table.date("date_of_birth")
                table.date("date_submit")
                table.string("address")
                table.string("position")
                table.string("school")
                table.boolean("is_ssi_support")
                table.boolean("is_validate_degree")

            })
    } catch (error) {
        console.log(error);
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('applicant');
}

