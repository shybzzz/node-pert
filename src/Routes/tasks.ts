import express = require("express");
import {tasksRepository} from "../Repositories";
import {CrudAdapter} from "../Adapters/CrudAdapter";
import {TasksAdapter} from "../Adapters/TasksAdapter";

let router = express.Router();

router.get('/', CrudAdapter.getAll(tasksRepository));
router.post('/', CrudAdapter.create(tasksRepository));
router.get('/:id', CrudAdapter.getById(tasksRepository, 'id'));
router.put('/:id', CrudAdapter.updateById(tasksRepository, 'id'));
router.delete('/:id', TasksAdapter.deleteTask);
router.get("/:id/predecessors", TasksAdapter.getTaskPredecessors);
router.get("/:id/predecessorSuggestions", TasksAdapter.getPredecessorSuggestions);

export var tasksRouter = router;