import archivecollection from "../models/archive.js";

// Implemented the function to fetch archive collections using GET functionality by ID
export const get = (id) => {
    const promise = archivecollection.findById(id).exec();
    return promise;
}

// Implemented the function to POST Archive collections
export const create = (archive) => {
    const newArchive = new archivecollection(archive);
    return newArchive.save();
} 

// Implemented the function to search and display an Archive collection
export const search = (params = {}) =>{
    const promise = archivecollection.find(params).exec();
    return promise;
};

// Implemented the function to update the archive using PUT functionality
export const update = (archive) => {
    archive._id = archive.id;
    const promise = archivecollection.findByIdAndUpdate(archive.id, archive, { new: true }).exec();
    return promise;
}

// Implemented the function to delete an archive collection using DELETE functionality
export const remove = (id) => {
    const promise = archivecollection.findByIdAndRemove(id).exec();
    return promise;
}