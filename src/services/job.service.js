import * as repository from "../repositories/job.repository.js";

export const createJob = (data) => {
  return repository.createJob(data);
};

export const getAllJobs = (search) => {
  return repository.findAllJobs(search);
};

export const getJobById = (id) => {
  return repository.findJobById(id);
};

export const updateJob = ( id, data ) => {
  return repository.updateJob( id, data );
};

export const deleteJob = (id) => {
  return repository.deleteJob(id);
};