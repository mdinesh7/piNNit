import trashcollection from "../models/trash.js";

// Implemented the function to fetch trash collections using GET functionality by ID
export const get = (id) => {
    const promise = trashcollection.findById(id).exec();
    return promise;
}

// Implemented the function to POST task in Trash collections
export const create = (trash) => {
    const newTrash = new trashcollection(trash);
    return newTrash.save();
} 

// Implemented the function to search and display a trash collection
export const search = (params = {}) =>{
    const promise = trashcollection.find(params).exec();
    return promise;
};

// Implemented the function to update the trash using PUT functionality
export const update = (trash) => {
    trash._id = trash.id;
    const promise = trashcollection.findByIdAndUpdate(trash.id, trash, { new: true }).exec();
    return promise;
}

// Implemented the function to delete the trash collection using DELETE functionality
export const remove = (id) => {
    const promise = trashcollection.findByIdAndRemove(id).exec();
    return promise;
}