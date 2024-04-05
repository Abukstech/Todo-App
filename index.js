const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const TodoModel = require("./models/todo")

const app = express();

dotenv.config({path:"./config.env"});

app.use(cors());

app.use(express.json())

const DB = process.env.DATABASE;

 
mongoose.connect(DB)
app.get('/get',  async (req,res)=>{

    try {

        const data   = await TodoModel.find();

 return res.json(data);
        
    } catch (error) {
        console.log(error);
        
    }

 


})

app.post('/create',  async (req,res)=>{

    const {task} = req.body;
    try {


const newTask = await TodoModel.create({
    task,
  
})
return res.json(newTask);


        
    } catch (error) {
        console.log(error);
        
    }

    
    
})


app.put('/update/:id', async  (req,res)=>{
    
    const {id} = req.params;
const updatedTask = await TodoModel.findByIdAndUpdate({_id: id}, {
    task:req.body.task,
    done: req.body.done,
    completedAt: req.body.done ? new Date() : null

}, {new: true});
    

return res.json(updatedTask);

})

app.delete('/delete/:id', async (req,res)=>{

    const {id} = req.params;
    await TodoModel.findByIdAndDelete({_id:id}) ;

    return res.json({});
    
})





app.listen(3003 , ()=>{
    console.log("listening on port 3003")
})