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

export const getMyJobs = (employerId) => {
  return repository.findJobsByEmployerId(employerId);
};

export const updateMyJob = (
  jobId,
  employerId,
  data
) => {
  return repository.updateJobByEmployer(
    jobId,
    employerId,
    data
  );
};

export const deleteMyJob = (
  jobId,
  employerId
) => {
  return repository.deleteJobByEmployer(
    jobId,
    employerId
  );
};