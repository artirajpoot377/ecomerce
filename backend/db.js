
const mongoose = require('mongoose')
const connectToMongo =  ()=>{
    mongoose.connect( "mongodb+srv://aarurajpoot1999:8650148233@cluster0.x0csqqn.mongodb.net/project1",{
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )
}
module.exports = connectToMongo;


