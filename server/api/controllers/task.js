import * as taskservice from '../services/task.js';

//Setting the response to error message if the status code is 500
const errorhandler = (message, response) =>{
    response.status(500);
    response.json({ error:message });
};

//Setting the response to fetch data if the status code is 200
const setSuccessResponse = (data, response) =>{
    response.status(200);
    response.json(data);
};

// Implemented the function to fetch a task using GET functionality by ID
export const get = async (request, response) => {
    try{
        const id = request.params.id;
        const task = await taskservice.get(id);
        setSuccessResponse(task, response);
    }
    catch (e)
    {
        errorhandler(e.message, response);
    }
};

// Implemented the function to search a task
export const index = async (request,response) => {
    try{
    const taskcollection =  await taskservice.search();
    setSuccessResponse(taskcollection, response);
    } catch(e){
        errorhandler(e.message, response);
    }
};

// Implemented the function to POST task collections
export const save = async (request, response) => {
    try{
        const task = {...request.body};
        const newTask = await taskservice.create(task);
        setSuccessResponse(newTask, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
};

// Implemented the function to update a task collections
export const update = async(request, response) => {
    try {
        const id = request.params.id;
        const task = {...request.body, id};
        const updatedTask = await taskservice.update(task);
        setSuccessResponse(updatedTask, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
};

// Implemented the function to delete a task collection using DELETE functionality
export const remove = async(request, response) => {
    try {
        const id = request.params.id;
        const task = await taskservice.remove(id);
        setSuccessResponse({ message: `Task Item Removed Successfully. id: ${id}`}, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
};