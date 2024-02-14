// connect to database

const Book = require("../models/book");
// add book
// async ---> do not wait for resulting
const addBook = async (req, res, next) => {
  const {name , price , author , ISBN , pages , cover , category} = req.body; 
  if (!name || !price || !author || !ISBN || !pages || !cover || !category) {
    return res.status(400).json({
      status: "fail",
      message: "Missing Required Field!"
    });
  }
  const newBook = await Book.create(req.body);
  // await --> saving first then continue
  await newBook.save();
  res.status(201).json({
    status: "success",
    message: "One Book Created!",
    data: {newBook}
  });
};

const showBooks = async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({
    status: "success",
    data: {books}
  });
};

// FIXME
const deleteBook = async (req, res, next) => {
  const book = await Book.findOne({ ISBN: req.params.ISBN });
  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "Book not found!"
    });
  }
  await Book.deleteOne({ ISBN: req.params.ISBN });
  res.json({
    status:  "success",
    message: "One book deleted"
  });
};

const editBook = async (req, res, next) => {
  const book = await Book.findOne({ ISBN: req.params.ISBN });
  // check if book is exist first then update this book
  if (!book){
    return res.status(404).json({
      status : "fail",
      message : "Book not found!"
    });
  }
  // update property that is not equal to null
  const {name, price, amount, author, pages, cover, category , rate , numberOfPayments} = req.body;
  if(name)book.name = name;
  if(price) book.price = price;
  if(amount) book.amount = amount;
  if(author)book.author = author;
  if(pages) book.pages = pages;
  if(cover)book.cover = cover;
  if(category)book.category = category;
  if(amount)book.amount = amount;
  if(rate)book.rate = rate;
  if(numberOfPayments)book.numberOfPayments = numberOfPayments;
  await book.save();
  //   200 --> okay
  res.status(200).json({
    status: "success",
    message: "One Book Updated!",
    data: {book}
  });
};

const getBookByISBN = async (req, res, next) => {
  const book = await Book.findOne({ ISBN: req.params.ISBN });
  if(!book){
    return res.status(404).json(
      {
        status: "fail",
        message : "This is not vaild ISBN"
      });
  }
  res.status(200).json({
    status: "success",
    data: {book}
  });
};

module.exports = { addBook, showBooks, deleteBook, editBook, getBookByISBN };
