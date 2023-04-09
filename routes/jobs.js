const jobRouter = require("express").Router();
const {
  getAllJobs,
  getJob,
  updateJob,
  createJob,
  deleteJob,
} = require("../controllers/jobs");


jobRouter.post("/", createJob);
jobRouter.get("/", getAllJobs);
jobRouter.get("/:id", getJob);
jobRouter.patch("/:id", updateJob);
jobRouter.delete("/:id", deleteJob);

module.exports = jobRouter;
