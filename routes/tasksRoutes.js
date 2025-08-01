const express = require('express');
const router = express.Router();
const tasks = require("../models/tasks.js");
const cors = require("cors");
const corsOptions = {
    origin: "*", // Permite qualquer origem durante desenvolvimento
    methods: ["GET", "POST", "PUT", "DELETE"], // garante que DELETE está liberado
    allowedHeaders: ["Content-Type"]
};

router.use(cors(corsOptions)); //.use() Aplica a todas as rotas

router.get("/all", (req, res)=>{

    res.status(200).json(tasks.getAllTasks());

});

router.post("/new", (req, res)=>{
    
    const title = req.body.title;
    const description = req.body.description;
    const expireDate = req.body.expireDate;

    try{
        tasks.createTask(title, description, expireDate);
        res.status(201).send("Task criada com sucesso");
    }catch (error){
        res.status(404).send(err.message);
    }
});

router.put("/update", (req, res)=>{
    
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const expireDate = req.body.expireDate;

    const newData = {
        id: id,
        title: title,
        description: description,
        expireDate: expireDate
    };

    try {
        tasks.updateTask(id, newData); // <== Passa o id como primeiro argumento
        res.status(200).send("Task atualizada com sucesso");
    } catch (err) {
        res.status(404).send(err.message);
    }

});

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    console.log("Recebido ID para deletar:", id);

    try {
        tasks.deleteTask(id);
        res.status(204).send("Task deletada com sucesso");
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;