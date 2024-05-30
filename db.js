const { Pool } = require('pg');

const config = {
    user: process.env.USERDB,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
}

const pool = new Pool(config);


const insertar = async (payload) => {
    /*Agregar Canciones */
    const text = "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *";
    const values = [payload.titulo, payload.artista, payload.tono]
    const queryObject = {
        text: text,
        values: values
    }

    const result = await pool.query(queryObject)
    return result
}
const consultar = async () => {
    /* Consultar Canciones y Mostrarlos en la tabla */

    const text = "SELECT * FROM canciones";


    const result = await pool.query(text)
    return result

}
const actualizar = async (payload) => {

    // Actualizar un registro
    const text = 'UPDATE canciones SET titulo =$1, artista =$2, tono =$3 WHERE id=$4';
    const values = [payload.titulo, payload.artista, payload.tono, payload.id]

    const result = await pool.query(text, values)

    return result
}
const eliminar = async (id) => {
    // Eliminar un registro
    const text = 'DELETE FROM canciones WHERE id = $1';
    const values = [id]

    const result = await pool.query(text, values)
    return result
}

module.exports = { insertar, consultar, actualizar, eliminar };