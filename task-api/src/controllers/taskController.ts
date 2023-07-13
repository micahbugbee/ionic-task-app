import { RequestHandler } from "express";
import { Task } from "../models/task";

export const getAllTasks: RequestHandler = async (req, res, next) => {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
}

export const getTask: RequestHandler = async (req, res, next) => {
    let taskId = req.params.id;
    let task = await Task.findByPk(taskId);

    if (task) {
        res.status(200).json(task);
    }
    else {
        res.status(404).json({error: 'Task not found'});
    }
}

export const createTask: RequestHandler = async (req, res, next) => {

    let newTask: Task = req.body;

    if (newTask.title) {
        let created = await Task.create(newTask);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

export const updateTask: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    const { title, completed } = req.body;
    
    try {
        const task = await Task.findByPk(id);

        if (task) {
            task.title = title;
            task.completed = completed;

            await task.save();
            res.status(200).json(task);
        }
        else {
            res.status(404).json({error: 'Task not found'});
        }
    }
    catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}

export const deleteTask: RequestHandler = async (req, res, next) => {
    let id = req.params.id;
    let found = await Task.findByPk(id);
    
    if (found) {
        await Task.destroy({
                where: { id: id }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}