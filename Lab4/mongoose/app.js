const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();
 
const clientscheme = new Schema({name: String, age: Number, number: String}, {versionKey: false});
const Сlient = mongoose.model("Client", clientscheme);
 
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/clientsdb")
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, function(){
            console.log("Сервер очікує підключення...");
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });
  
app.get("/api/clients", async function(req, res){
    const clients = await Сlient.find({}).exec();
    res.send(clients);
});
 
app.get("/api/clients/:id", async function(req, res){
         
    const id = req.params.id;
    const client = await Сlient.findOne({_id: id});
    res.send(client);
});
    
app.post("/api/clients", jsonParser, async function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const clientName = req.body.name;
    const clientAge = req.body.age;
    const clientNumber = req.body.number;
    const client = new Сlient({name: clientName, age: clientAge, number: clientNumber});
        
    await client.save();
    res.send(client);
});
     
app.delete("/api/clients/:id", async function(req, res){
         
    const id = req.params.id;
    const client = await Сlient.findByIdAndDelete(id);
    res.send(client);
});
    
app.put("/api/clients", jsonParser, async function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const clientName = req.body.name;
    const clientAge = req.body.age;
    const clientNumber = req.body.number;
    const newclient = {age: clientAge, name: clientName, number: clientNumber};
     
    const client = await Сlient.findOneAndUpdate({_id: id}, newclient, {new: true});
    res.send(client);
});
