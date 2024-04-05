const mongoose = require("mongoose");


const TodoSchema = mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false,
        
    },
    createdAt: {
        type: Date,
        default:Date.now
    },

    completedAt: {
        type: Date,
        default:null

    }
})



const TodoModel = mongoose.model("todos", TodoSchema);

module.exports= TodoModel;