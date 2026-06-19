import * as repository from "../repositories/application.repository.js";

export const getApplications = (status, search) => {
  return repository.findAll(status, search);
};

export const getApplicationById = ( id ) => {
  return repository.findById(id);
};

export const createApplication = ( data ) => {
  return repository.create(data);
};

export const updateApplication = async( applicationId, employerId,  data ) => {
  const application =
    await repository.findApplicationWithEmployer(
      applicationId
    );

  if (!application) {
    throw new Error("Application not found");
  }

  if ( application.employer_id !== employerId ) {
    throw new Error(
      "Unauthorized to update this application"
    );
  }

  return await repository.update( applicationId, data );
};

export const deleteApplication = ( applicationId, employeeId ) => {
  return repository.remove( applicationId, employeeId );
};