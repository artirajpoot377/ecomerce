const jwt = require("jsonwebtoken");
const {validObjectId } = require('../validator/validation')
const User = require('../models/User')
const Notes = require('../models/Notes')


//-------------------------------[ AUTHENTICATION ]--------------------------------//

const authentication = async function(req,res,Next){
    try {
        let token = req.headers["authorization"];
     
        if (!token) {
          return res.status(400).send({ status: false, message: "Token must be present." });
        }
      
        token = token.replace("Bearer ","")
       

        jwt.verify(token, 'inotebook', function (error, decoded) { 

          
    
          if (error) {
            return res.status(401).send({ status: false, message: error.message });
          }
          else {
            req.decodedToken = decoded

          
            Next()
          }
        })
      } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
      }
    
    }
  //   const authorise = async function (req, res, next) {

  //     try {
  //         const decodedToken = req.decodedToken
          
  //         let NotesId = req.params.NotesId;
      
  //         const note = await Notes.findById(NotesId);
  
  //         if (!note) {
  //             return res.status(404).send({ status: false, msg: "Blog is not found" });
  //         }
  
  //         let tokenUser = decodedToken.userId;
  //         let loginUser = blog.userId
  
  //         if (tokenUser == loginUser) {
  //             next()
  //         } else {
  //             return res.status(403).send({ status: false, msg: "unauthorized  user info doesn't match" });
  //         }
  //     } catch (err) {
  //         return res.status(500).send({ status: false, error: err.message });
  //     }
  // };
    module.exports = {authentication}