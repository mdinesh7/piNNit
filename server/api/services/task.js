import taskcollection from "../models/task.js";

// Implemented the function to fetch task collections using GET functionality by ID
export const get = (id) => {
    const promise = taskcollection.findById(id).exec();
    return promise;
}

// Implemented the function to POST task collections
export const create = (task) => {
    const newTask = new taskcollection(task);
    return newTask.save();
} 

// Implemented the function to search and display a task collection
export const search = (params = {}) =>{
    const promise = taskcollection.find(params).exec();
    return promise;
};

// Implemented the function to update tasks using PUT functionality
export const update = (task) => {
    task._id = task.id;
    const promise = taskcollection.findByIdAndUpdate(task.id, task, { new: true }).exec();
    return promise;
}

// Implemented the function to delete a task collection using DELETE functionality
export const remove = (id) => {
    const promise = taskcollection.findByIdAndRemove(id).exec();
    return promise;
}