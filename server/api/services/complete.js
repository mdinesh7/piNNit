import completecollection from "../models/complete.js";

// Implemented the function to fetch complete collections using GET functionality by ID
export const get = (id) => {
    const promise = completecollection.findById(id).exec();
    return promise;
}

// Implemented the function to POST Complete collections
export const create = (complete) => {
    const newComplete = new completecollection(complete);
    return newComplete.save();
} 

// Implemented the function to search and display an Complete collection
export const search = (params = {}) =>{
    const promise = completecollection.find(params).exec();
    return promise;
};

// Implemented the function to update the complete using PUT functionality
export const update = (complete) => {
    complete._id = complete.id;
    const promise = completecollection.findByIdAndUpdate(complete.id, complete, { new: true }).exec();
    return promise;
}

// Implemented the function to delete an complete collection using DELETE functionality
export const remove = (id) => {
    const promise = completecollection.findByIdAndRemove(id).exec();
    return promise;
}