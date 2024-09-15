import { expect , test , beforeAll , afterAll } from 'vitest'
import mysql from 'mysql2/promise'
import 'dotenv/config'
import ListaUsuarios from './lista-usuarios';
import InserirUsuarios from './inserir-usuarios'
beforeAll(async()=>{
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USUARIO,
        database: process.env.DB_BANCO,
    });
    await connection.query("DELETE FROM usuarios");
})
afterAll(async()=>{
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USUARIO,
        database: process.env.DB_BANCO,
    });
    await connection.query("DELETE FROM usuarios");
})
test("Deve inserir um usuario no banco de dados",async()=>{
    //GIVEN
    const usuarioParaInserir = {
        id:1,
        nome:"Joao",
        idade:18,
        cpf:"036.547.382-10",
        rg:"002.874.325",
        endereco:"Rua das flores, Bairro dos Planetas, Número 10, Naviraí - MS",
        estado_civil: "Casado"
    }
    //WHEN
    const inserirUsuarios = new InserirUsuarios()
    const usuarioBanco = await inserirUsuarios.execute(usuarioParaInserir)
    //THEN
    expect(usuarioBanco).toStrictEqual(usuarioParaInserir)
    const listaUsuarios = new ListaUsuarios()
    const usuarios = await listaUsuarios.execute()
    expect(usuarios).toContainEqual(usuarioParaInserir)

})