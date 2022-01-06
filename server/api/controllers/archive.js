import * as archiveservice from "../services/archive.js";

//Setting the response to error message if the status code is 500
const errorhandler = (message, response) => {
  response.status(500);
  response.json({ error: message });
};

//Setting the response to the actual data if the status code is 200
const setSuccessResponse = (data, response) => {
  response.status(200);
  response.json(data);
};

// Implemented the function to fetch archive collections using GET functionality by ID
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const archive = await archiveservice.get(id);
    setSuccessResponse(archive, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

// Implemented the function to search an Archive collection
export const index = async (request, response) => {
  try {
    const archivecollection = await archiveservice.search();
    setSuccessResponse(archivecollection, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

// Implemented the function to POST Archive collections
export const save = async (request, response) => {
  try {
    const archive = { ...request.body };
    const newarchive = await archiveservice.create(archive);
    setSuccessResponse(newarchive, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

// Implemented the function to update the archive using PUT functionality
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const archive = { ...request.body, id };
    const updatedarchive = await archiveservice.update(archive);
    setSuccessResponse(updatedarchive, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

// Implemented the function to delete an archive collection using DELETE functionality
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const archive = await archiveservice.remove(id);
    setSuccessResponse(
      { message: `Archive Item Removed Successfully. id: ${id}` },
      response
    );
  } catch (e) {
    errorhandler(e.message, response);
  }
};
