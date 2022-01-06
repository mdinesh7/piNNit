import * as trashservice from '../services/trash.js';

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

// Implemented the function to fetch a task in trash using GET functionality by ID
export const get = async (request, response) => {
    try{
        const id = request.params.id;
        const trash = await trashservice.get(id);
        setSuccessResponse(trash, response);
    }
    catch (e)
    {
        errorhandler(e.message, response);
    }
};

// Implemented the function to search a task in trash collection
export const index = async (request,response) => {
    try{
    const trashcollection =  await trashservice.search();
    setSuccessResponse(trashcollection, response);
    } catch(e){
        errorhandler(e.message, response);
    }
};

// Implemented the function to add a new task in trash collections
export const save = async (request, response) => {
    try{
        const trash = {...request.body};
        const newTrash = await trashservice.create(trash);
        setSuccessResponse(newTrash, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
};

// Implemented the function to update a trash collection
export const update = async(request, response) => {
    try {
        const id = request.params.id;
        const trash = {...request.body, id};
        const updatedTrash = await trashservice.update(trash);
        setSuccessResponse(updatedTrash, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
};

// Implemented the function to delete a task in trash using DELETE functionality
export const remove = async(request, response) => {
    try {
        const id = request.params.id;
        const trash = await trashservice.remove(id);
        setSuccessResponse({ message: `Trash Item Removed Successfully. id: ${id}`}, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
};