const db = require("../../utils/database")
const Book = require("./model")

Book()

function createOne(req, res) {
    const bookToCreate = {
        ...req.book
    }

    const createOne = `
    INSERT INTO products (title, type, author, topic, publicationDate)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `

    db.query(createOne, [bookToCreate.title, bookToCreate.type, bookToCreate.author, bookToCreate.topic, bookToCreate.publicationDate])
    .then((result) => res.json({ data: result.rows[0]}))
    .catch(console.error)
}

function getAll(req, res) {
    const getAll = `
    SELECT *
    FROM books
    `

    db.query(getAll)
    .then((result) => res.json({ data: result.rows}))
    .catch(console.error)
}

function getOneById(req, res) {
    const idToGet = req.params.id;
  
    const getOneById = `
      SELECT *
      FROM books
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