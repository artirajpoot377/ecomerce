const express = require('express')
const router = express.Router();
const User = require('../models/User');
const route = require('../routes/route');
const Notes = require('../models/Notes');
const mongoose = require('mongoose')


function stringVerify(value) {
  if (typeof value !== "string" || value.length == 0) {
    return false
  }
  return true
}


//--------------------------createNotes api--------------------------//

const createNotes = async function (req, res) {
  try {
    let data = req.body;
    let { title, description, userId, tag } = data;

    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, msg: "Please Enter details" });
    }

    if (!title) {
      return res.status(400).send({ status: false, msg: "Title is required" });
    }

    if (!description) {
      return res.status(400).send({ status: false, msg: "Body is required" });
    }

    if (!userId) {
      return res.status(400).send({ status: false, msg: "AuthorId is required" });
    }

    if (!tag) {
      return res.status(400).send({ status: false, msg: "Category is required" });
    }

    if (!stringVerify(title)) {
      return res.status(400).send({ status: false, msg: "Title should be type String" });
    }

    if (!stringVerify(description)) {
      return res.status(400).send({ status: false, msg: "Body should be type String" });
    }

    if (!stringVerify(userId)) {
      return res.status(400).send({ status: false, msg: "AuthorId should be type String" });
    }


    if (!stringVerify(tag)) {
      return res.status(400).send({ status: false, msg: "tagsshould be in Array of String only" });
    }

    let authId = await User.findById(data.userId)

    if (!authId) {
      return res.status(400).send({ status: false, msg: "UserID is not Present" });
    }

    let noteData = await Notes.create(data);
    return res.status(201).send({ status: true, message: "successfull", data: noteData });

  } catch (err) {
    return res.status(500).send({ msg: "Error", error: err.message });
  }

};


//=======================getnotes====================================
const getBlog = async function (req, res) {
  try {
    let allNote = req.query;
    let { title, description, userId, tag } = allNote;

    if (description) {
      if (!stringVerify(description)) {
        return res.status(400).send({ msg: "Category should be type String" });
      }
    }

    if (title) {
      if (!stringVerify(title)) {
        return res.status(400).send({ msg: "title should be type String" });
      }
    }
    if (tag) {
      if (!stringVerify(tags)) {
        return res.status(400).send({ status: false, msg: "tags/subCategory should be in Array of String only" });
      }
    }
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) { return res.status(400).send({ status: false, msg: "! Oops authorId is not valid" }) }
    }

    let noteDetails = await Notes.find({ $and: [{ isDeleted: false }, allNote] })
    if (noteDetails == 0) {
      return res.status(404).send({ status: false, msg: "notes not found" })
    }
    else {
      res.status(200).send({ status: true, data: noteDetails })
    }
  } catch (err) {
    res.status(500).send({ msg: "Error", error: err.message })
  }
}
//===========================deletenots===============================

const deleteBook = async function (req, res) {
  try {
    let notesId = req.params.notesId
    let userIdFromToken = req.decodedToken.userId
    let bookdata = await Notes.findById(notesId)


    if (!mongoose.isValidObjectId(userIdFromToken)) { return res.status(400).send({ status: false, message: 'userId from token is not valid userId' }) }
    if (!mongoose.isValidObjectId(notesId)) { return res.status(400).send({ status: false, message: 'BookId is a not a valid bookId' }) }
    if (!bookdata) { return res.status(404).send({ message: "No Book exists with the bookid" }) }
    if (bookdata.isDeleted === true) { return res.status(400).send({ message: "Book is already deleted" }) }

    let userId = bookdata.userId

    if (userId.toString() !== userIdFromToken) {
      return res.status(400).send({ status: false, message: 'you not authorised to deleted this book' })
    }

    let deletebook = await Notes.findOneAndUpdate({ _id: notesId }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })

    res.status(200).send({ status: true, message: "book is sucessfully deleted" })

  }
  catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
}



//=================================updatenote=======================

const updateNote = async function (req, res) {
  let inputBookId = req.params.notesId
  const userIdFromToken = req.decodedToken.userId
  let input1 = req.body
  let { title, description, userId, tag } = input1

  if (Object.keys(input1) == 0) { return res.status(400).send({ status: false, message: "please enter update in body" }) }

  if (!mongoose.isValidObjectId(userIdFromToken)) {
    return res.status(400).send({ status: false, message: 'userId from token is not correct' })
  }



  //Checking if BlogId to be updated exists
  let checkinputBookId = await Notes.findById({ _id: inputBookId })
  if (!checkinputBookId) { return res.status(404).send({ status: false, message: "BookId not found." }) }

  if (userIdFromToken != checkinputBookId.userId) {
    return res.status(400).send({ status: false, message: 'you are not authorised to create book with other userId' })
  }

  //checking if unique entry already exists
  let checktitle = await Notes.findOne({ title: title })
  if (checktitle) { return res.status(400).send({ status: false, message: "title already exists" }) }

  // updating books
  let updatedBookData = await Notes.findOneAndUpdate({ _id: inputBookId, isDeleted: false },
    { $set: { title: title, description: description, tag: tag } },
    { new: true })

  if (!updatedBookData) { res.status(500).send({ status: false, message: "Can not be updated." }) }   ///for testing purpose

  return res.status(200).send({ status: true, message: "Success", data: updatedBookData }) //Response OK
}

module.exports = { createNotes, getBlog, updateNote, deleteBook }