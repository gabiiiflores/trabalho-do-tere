import {test,expect,describe,beforeAll} from 'vitest'
import mysql from 'mysql2/promise'
import 'dotenv/config'
import ListaUsuarios from './lista-usuarios';
beforeAll(async()=>{
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USUARIO,
        database: process.env.DB_BANCO,
    });
    await connection.query("DELETE FROM usuarios");
    await connection.query("insert into usuarios values(?,?,?,?,?)",
        ['1','João','18','036.547.382-10','002.874.325','Rua das flores, Bairro dos Planetas, Número 10, Naviraí - MS','Casado'])
})
test("Deve listar os usuarios do banco de dados",async()=>{
    //GIVEN   -> dado alguma coisa
    const usuarioPreCadastrado = [{
        id:1,
        nome:"Joao",
        idade:18,
        cpf:"036.547.382-10",
        rg:"002.874.325",
        endereco:"Rua das flores, Bairro dos Planetas, Número 10, Naviraí - MS",
        estado_civil: "Casado"
    }]
    const listaUsuarios = new ListaUsuarios()
    //WHEN    -> Quando eu fizer algo
    const usuarios = await listaUsuarios.execute()
    //THEN    -> Eu espero que aconteça;
    expect(usuarios).toEqual(usuarioPreCadastrado)
});