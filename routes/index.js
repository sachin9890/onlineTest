var express = require('express');
var router = express.Router();

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://sachin:sachin721@cluster0.qcgao.mongodb.net";
const client = new MongoClient(uri, { useNewUrlParser: true });

try {
  // Connect to the MongoDB cluster
  client.connect();

  router.get('/', function (req, res, next) {
    var result = client.db('onlineTest').collection('questions').find({})
      .toArray(function (err, result) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
        res.json({ 'data': result })
      })

  });

  router.post('/submit', function (req, res, next) {
    client.db('onlineTest').collection('answers').find({}).toArray(function (err, answers) {
      //var answers = result;
      var correctAns = 0;
      var inCorrectAns = 0;
      var totalQuestions = req.body.length

      req.body.map(function (ele, index) {
        var checkAns = answers.find(function (item, index) {
          return item.id === ele.id && item.ansKey === ele.selectedAns
        })
        if (checkAns) {
          correctAns = correctAns + 1
        } else {
          inCorrectAns = inCorrectAns + 1
        }
      })

      var percent = (correctAns / totalQuestions) * 100;
      //return result

      client.db('onlineTest').collection('result').updateOne({ _id: '615c2c8f27405f319d23fad4' }, { $set: { correctAns, inCorrectAns, percent } }).finally(function () {
        res.json({ correctAns, inCorrectAns, percent })
      })

    })
  });



} catch (e) {
  console.error(e);
} finally {
  client.close();
}


/* GET home page. */


module.exports = router;
