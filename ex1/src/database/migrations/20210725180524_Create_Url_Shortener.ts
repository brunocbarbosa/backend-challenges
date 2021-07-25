import { Knex } from "knex";
import { DateTime } from 'luxon'

const created = DateTime.now().toISODate()
const expired = DateTime.local().plus({days:3}).toISODate()


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('url_shortener', table => {
    table.increments('id').primary();
    table.string('url').notNullable();
    table.string('shortened').notNullable();
    table.timestamp('created_at').defaultTo(created);
    table.timestamp('expired_at').defaultTo(expired);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('url_shortener');
}

