import Knex from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex : Knex) {
    await knex('users').insert([{
            name: 'Administrador',
            email: 'admin@pethero.com.br',
            whatsapp: '11 95130-1230',
            password: await bcrypt.hash('123', 10),
            uf: 'SP',
            city: 'São Paulo',
        },]);
}
