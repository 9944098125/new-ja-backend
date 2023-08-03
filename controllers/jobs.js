import db from "../databaseConnection/db.js";

export const create = (req, res) => {
  const {
    company_logo,
    company_name,
    job_role,
    job_type,
    location,
    skills,
    salary,
    responsibilities,
    experience,
    about_job,
    about_company,
    user_id,
  } = req.body;
  const sql =
    "INSERT INTO jobs (company_logo, company_name, job_role, job_type, location, skills, salary, responsibilities, experience, about_job, about_company, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    company_logo,
    company_name,
    job_role,
    job_type,
    location,
    skills,
    salary,
    responsibilities,
    experience,
    about_job,
    about_company,
    user_id,
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Internal error..." });
    } else if (result.affectedRows > 0) {
      // console.log(result);
      res.status(201).json({ message: "Job Created successfully" });
    }
  });
};

export const read = (req, res) => {
  const sql = "SELECT * FROM jobs";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(403).json({ message: "Internal error..." });
    } else if (result) {
      res
        .status(200)
        .json({ message: "Fetched jobs successfully", jobs: result });
    }
  });
};

export const readByEmployerId = (req, res) => {
  const { employerId } = req.params;
  const sql = "SELECT * FROM jobs WHERE user_id = ?";
  db.query(sql, [employerId], (err, result) => {
    if (err) {
      return res.status(400).json({ message: "some Internal error..." });
    } else if (result) {
      res.status(200).json({
        message: "Fetched your posted jobs successfully",
        job: result,
      });
    }
  });
};

export const updateJob = (req, res) => {
  const { jobId, employerId } = req.params;
  const {
    company_logo,
    company_name,
    job_role,
    job_type,
    location,
    skills,
    salary,
    responsibilities,
    experience,
    about_job,
    about_company,
  } = req.body;
  const sql =
    "UPDATE jobs SET company_logo = ?, company_name = ?, job_role = ?, job_type = ?, location = ?, skills = ?, salary = ?, responsibilities = ?, experience = ?, about_job = ?, about_company = ? WHERE id = ? AND user_id = ?";
  const values = [
    company_logo,
    company_name,
    job_role,
    job_type,
    location,
    skills,
    salary,
    responsibilities,
    experience,
    about_job,
    about_company,
    jobId,
    employerId,
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(400).json({ message: "some internal error..." });
    } else if (result.affectedRows > 0) {
      res.status(200).json({ message: "Updated the job successfully" });
    }
  });
};

export const deleteJob = (req, res) => {
  const { jobId } = req.params;
  const sql = "DELETE FROM jobs WHERE id = ?";
  db.query(sql, [jobId], (err, result) => {
    if (err) {
      return res.status(403).json({ message: "Some Internal error" });
    } else if (result.affectedRows > 0) {
      res.status(200).json({ message: "Deleted the job successfully" });
    }
  });
};
