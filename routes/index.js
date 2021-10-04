var express = require('express');
var router = express.Router();

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://sachin:sachin721@cluster0.qcgao.mongodb.net";


  const client = new MongoClient(uri, { useNewUrlParser: true });

  try {
      // Connect to the MongoDB cluster
      var con = client.connect();
      
      // Make the appropriate DB calls
      // await  listDatabases(client);
      router.get('/', function(req, res, next) {
        var result = client.db('onlineTest').collection('questions').find({})
        .toArray(function(err, result){
          console.log(result)
          //return result
          res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
          res.json(result)
        })
        
      });

  } catch (e) {
      console.error(e);
  } finally {
      client.close();
  }


/* GET home page. */


module.exports = router;
