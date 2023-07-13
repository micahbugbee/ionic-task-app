"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTask = exports.getAllTasks = void 0;
const task_1 = require("../models/task");
const getAllTasks = async (req, res, next) => {
    const tasks = await task_1.Task.findAll();
    res.status(200).json(tasks);
};
exports.getAllTasks = getAllTasks;
const getTask = async (req, res, next) => {
    let taskId = req.params.id;
    let task = await task_1.Task.findByPk(taskId);
    if (task) {
        res.status(200).json(task);
    }
    else {
        res.status(404).json({ error: 'Task not found' });
    }
};
exports.getTask = getTask;
const createTask = async (req, res, next) => {
    let newTask = req.body;
    if (newTask.title) {
        let created = await task_1.Task.create(newTask);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createTask = createTask;
const updateTask = async (req, res, next) => {
    const id = req.params.id;
    const { title, completed } = req.body;
    try {
        const task = await task_1.Task.findByPk(id);
        if (task) {
            task.title = title;
            task.completed = completed;
            await task.save();
            res.status(200).json(task);
        }
        else {
            res.status(404).json({ error: 'Task not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res, next) => {
    let id = req.params.id;
    let found = await task_1.Task.findByPk(id);
    if (found) {
        await task_1.Task.destroy({
            where: { id: id }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deleteTask = deleteTask;
