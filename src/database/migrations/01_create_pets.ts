import Knex from 'knex';

export async function up(knex : Knex) {
    return knex.schema.createTable('pets', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('category').notNullable();
        table.integer('age').notNullable();
        table.string('image').notNullable();
        table.string('size').notNullable();
        table.string('genre').notNullable();
        table.string('history').notNullable();
        table.integer('user_id').notNullable().references('id').inTable('users');
        table.timestamps(true);
    });
}

export async function down(knex : Knex) {
    return knex.schema.dropTable('pets');
}
