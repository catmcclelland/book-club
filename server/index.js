"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const pool = require("./db.ts");
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//routes
//create book
app.post("/books", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { title, author } = req.body;
      const newBook = yield pool.query(
        "INSERT INTO books (title, author) VALUES($1, $2) RETURNING *",
        [title, author]
      );
      res.json(newBook.rows[0]);
    } catch (err) {
      console.log(err);
    }
  })
);
//get all books
app.get("/books", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const allBooks = yield pool.query("SELECT * FROM books");
      res.json(allBooks.rows);
    } catch (err) {
      console.log(err);
    }
  })
);
//get a book
app.get("/books/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { id } = req.params;
      const book = yield pool.query("SELECT * FROM books WHERE book_id = $1", [
        id,
      ]);
      res.json(book.rows[0]);
    } catch (err) {
      console.log(err.message);
    }
  })
);
//update a book
app.put("/books/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { id } = req.params;
      const { title, author } = req.body;
      const updateBook = yield pool.query(
        "UPDATE books SET title = $1, author = $2 WHERE book_id = $3",
        [title, author, id]
      );
      res.json("Book was updated");
    } catch (err) {
      console.log(err.message);
    }
  })
);
//delete a book
app.delete("/books/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { id } = req.params;
      const deleteBook = yield pool.query(
        "DELETE FROM books WHERE book_id = $1",
        [id]
      );
      res.json("Book was deleted");
    } catch (err) {
      console.log(err.message);
    }
  })
);
app.listen(5000, () => {
  console.log("server started on port 5000");
});
