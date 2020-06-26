import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    try {
        await knex.schema.dropTableIfExists('applicant');
        const isExisting = await knex.schema.hasTable('applicant');
        if (!isExisting)
            await knex.schema.createTable("applicant", table => {
                table
                    .increments('id')
                    .unsigned()
                    .primary();
                table.string("name"); 
                table.date("date_of_birth");
                table.string("phone_number");
                table.string("email");
                table.date("date_submit");
                table.string("address");
                table.string("position");
                table.string("school");
                table.string("connection_id")
                table.string("invitation_url", 1000);
                table.string("proof_id");
                table.boolean("is_ssi_support");
                table.boolean("is_validate_degree");

            })
    } catch (error) {
        console.log(error);
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('applicant');
}

