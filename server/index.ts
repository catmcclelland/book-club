import express from "express";
const app = express();
import cors from 'cors';
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//routes

//create book
app.post("/books", async (req, res) => {
try {
const { title, author } = req.body;
const newBook = await pool.query("INSERT INTO books (title, author) VALUES($1, $2) RETURNING *", [title, author]);
res.json(newBook.rows[0]);
 
}catch(err) { 
console.log(err);
}
})
//get all books
app.get("/books", async (req, res)=> {
    try{
const allBooks = await pool.query("SELECT * FROM books");
res.json(allBooks.rows);
    }catch(err) {
        console.log(err);
    }
})
//get a book
app.get("/books/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const book = await pool.query("SELECT * FROM books WHERE book_id = $1", [id]);
        res.json(book.rows[0]);
    }catch(err: any){
        console.log(err.message)
    }
})
//update a book
app.put("/books/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const { title, author } = req.body;
        const updateBook = await pool.query("UPDATE books SET title = $1, author = $2 WHERE book_id = $3", [title, author, id]);
        res.json("Book was updated")
    } catch (err: any) {
        console.log(err.message)
    }
} )

//delete a book
app.delete("/books/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteBook = await pool.query("DELETE FROM books WHERE book_id = $1", [id]);
        res.json("Book was deleted");
    } catch (err: any) {
        console.log(err.message)
    }
})
app.listen(5000, ()=> {
    console.log('server started on port 5000')
})