var express = require('express');
var router = express.Router();

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://sachin:sachin721@cluster0.qcgao.mongodb.net";
const client = new MongoClient(uri, { useNewUrlParser: true });

  try {
      // Connect to the MongoDB cluster
      client.connect();
      
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

      router.post('/submit', function(req, res, next) {
        var result = client.db('onlineTest').collection('result').insertOne({correctAns: 22, inCorrectAns: 21, finalResult: 'pass'}).finally(function(){
          res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
          res.json({correctAns: 22, inCorrectAns: 21, finalResult: 'pass'})
        })
        // .toArray(function(err, result){
        //   var answers = result;
        //   var correctAns = 0;
        //   var inCorrect = 0;

          // req.body.map(function(ele, index){
          //     var checkAns = answers.find(function(item, index){
          //       return item.id === ele.id && 
          //     })
          // })
          //return result
          
          
          //res.json(req.body)

        //})
        
      });



  } catch (e) {
      console.error(e);
  } finally {
      client.close();
  }


/* GET home page. */


module.exports = router;
