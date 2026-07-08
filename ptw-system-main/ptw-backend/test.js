const { MongoClient } = require("mongodb");

const uri =
  "mongodb://hitasri10930_db_user:Hitasri12345@ac-85lr2ll-shard-00-00.3lfsq2n.mongodb.net:27017,ac-85lr2ll-shard-00-01.3lfsq2n.mongodb.net:27017,ac-85lr2ll-shard-00-02.3lfsq2n.mongodb.net:27017/?ssl=true&replicaSet=atlas-yizun1-shard-0&authSource=admin&retryWrites=true&w=majority";

async function test() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("MongoDB Connected!");
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

test();