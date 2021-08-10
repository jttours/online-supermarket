// This file will handle connection logic to the MongoDB database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/onlineMarket',{
    useNewUrlParser : true, 
    useUnifiedTopology: true,
    useFindAndModify: false
 }).then(()=> {
    console.log("connected to MongoDB successfully :-)");
}).catch((e)=> {
    console.log ("error while connecting to MongoDb");
    console.log(e);
});


// To prevent deprecation warnings

mongoose.set('useCreateIndex', true);


module.exports ={
    mongoose
};
