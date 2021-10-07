const db = require("../../utils/database")
const Pet = require("./model")

Pet()

function createOne(req, res) {
    const petToCreate = {
        ...req.book
    }

    const createOne = `
    INSERT INTO pets (name, age, type, breed, microchip)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `

    db.query(createOne, [petToCreate.name, petToCreate.age, petToCreate.type, petToCreate.breed, petToCreate.microchip])
    .then((result) => res.json({ data: result.rows[0]}))
    .catch(console.error)
}

function getAll(req, res) {
    const getAll = `
    SELECT *
    FROM pets
    `

    db.query(getAll)
    .then((result) => res.json({ data: result.rows}))
    .catch(console.error)
}

function getOneById(req, res) {
    const idToGet = req.params.id;
  
    const getOneById = `
      SELECT *
      FROM pets
      WHERE id = $1;
    `;
  
    db.query(getOneById, [idToGet])
      .then((result) => res.json({ data: result.rows[0] }))
      .catch(console.error);
  }
  

module.exports = {
    createOne,
    getAll,
    getOneById
}