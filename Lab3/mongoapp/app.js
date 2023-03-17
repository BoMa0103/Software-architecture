const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;

const app = express();
const jsonParser = express.json();

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

let dbClient;

app.use(express.static(__dirname + "/public"));

async function connect() {
    // Use connect method to connect to the server
    await client.connect();

    dbClient = client;

    app.locals.collection = client.db("clientsdb").collection("clients");
    app.listen(3000, function () {
        console.log("Сервер очікує підключення...");
    });
}

app.get("/api/clients", async function (req, res) {
    const collection = req.app.locals.collection;
    let clients = await collection.find({}).toArray();
    res.send(clients);
});

app.get("/api/clients/:id", async function (req, res) {

    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    let client = await collection.findOne({ _id: id });
    res.send(client);
});

app.post("/api/clients", jsonParser, async function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const clientName = req.body.name;
    const clientAge = req.body.age;
    const clientNumber = req.body.number;
    const client = { name: clientName, age: clientAge, number: clientNumber };

    const collection = req.app.locals.collection;
    let inserted = await collection.insertOne(client);
    let insertedClient = await collection.findOne({_id: inserted.insertedId});
    res.send(insertedClient);
});

app.delete("/api/clients/:id", async function (req, res) {

    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    const deletedClient = await collection.findOneAndDelete({ _id: id });
    res.send(deletedClient.value);
});

app.put("/api/clients", jsonParser, async function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const clientName = req.body.name;
    const clientAge = req.body.age;
    const clientNumber = req.body.number;

    const collection = req.app.locals.collection;
    const updatedClient = await collection.findOneAndUpdate({ _id: id }, { $set: { age: clientAge, name: clientName, number: clientNumber }}, { returnDocument: "after"});
    res.send(updatedClient.value); 
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});

connect().catch(console.error);