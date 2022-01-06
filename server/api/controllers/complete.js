import * as completeservice from "../services/complete.js";

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

// Implemented the function to fetch complete collections using GET functionality by ID
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const complete = await completeservice.get(id);
    setSuccessResponse(complete, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

// Implemented the function to search an Complete collection
export const index = async (request, response) => {
  try {
    const completecollection = await completeservice.search();
    setSuccessResponse(completecollection, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

// Implemented the function to POST Complete collections
export const save = async (request, response) => {
  try {
    const complete = { ...request.body };
    const newcomplete = await completeservice.create(complete);
    setSuccessResponse(newcomplete, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

// Implemented the function to update the complete using PUT functionality
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const complete = { ...request.body, id };
    const updatedcomplete = await completeservice.update(complete);
    setSuccessResponse(updatedcomplete, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

// Implemented the function to delete an complete collection using DELETE functionality
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const complete = await completeservice.remove(id);
    setSuccessResponse(
      { message: `Completed Item Removed Successfully. id: ${id}` },
      response
    );
  } catch (e) {
    errorhandler(e.message, response);
  }
};
