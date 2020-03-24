//Script que roda ao inicar a migration
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

//Script que roda se algo der errado na inicialização
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
