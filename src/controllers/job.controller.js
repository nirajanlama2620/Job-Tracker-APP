import * as service from "../services/job.service.js";

export const createJob = async (req, res) => {
  try {

     const jobData = {
      ...req.body,
      employer_id: req.user.id
    };

    const id = await service.createJob(jobData);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      jobId: id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const { search } = req.query;

    const jobs = await service.getAllJobs(search);

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await service.getJobById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({ success: true, data: job, });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const result = await service.updateJob(req.params.id, req.body);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const result = await service.deleteJob(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Job not found", });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};