import mongoose = require("mongoose");

var workItemsSchema = new mongoose.Schema({
    started: Date,
    finished: Date
});

export var TaskSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    estimation: Number,
    isCompleted: Boolean,
    projectId: String,
    workItems: [workItemsSchema],
    predecessors: [String],
    successors: [String]
});
export var tasksRepository = mongoose.model("TaskSchema", TaskSchema);

export var projectsRepository = mongoose.model("ProjectSchema", new mongoose.Schema({
    name: String,
    description: String
}));


