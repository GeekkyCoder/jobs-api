const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs });
};

const getJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;
  const job = await Job.findOne({ createdBy: userId, _id: jobId });

  if (!job) {
    throw new NotFoundError(`no job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;
  const payload = req.body;
  const updatedJob = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    payload,
    { upsert: true }
  );

  if (!updatedJob) {
    throw new NotFoundError(`job with ${jobId} does not exist`);
  }

  const job = await Job.findOne({ _id: updatedJob._id });

  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;
  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`job with id ${jobId} does not exist`);
  }

  res
    .status(StatusCodes.OK)
    .json(`successfully deleted the job with id ${jobId}`);
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
