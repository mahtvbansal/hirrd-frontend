import { apiRequest } from "@/lib/api";

// Fetch Jobs
export async function getJobs(options) {
  const { location, company_id, searchQuery } = options;
  const params = {}
  if (location) params.location = location
  if (company_id) params.company_id = company_id
  if (searchQuery) params.searchQuery = searchQuery
  try {
    const response = await apiRequest({
      url: `/api/v1/jobs`,
      data: params
    });
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
}

// Read single job
export async function getSingleJob({ job_id }) {
  try {
    const response = await apiRequest({
      url: `/api/v1/jobs/${job_id}`,
    });
    console.log(response);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
}

// Read Saved Jobs
export async function getSavedJobs() {

}

// - Add / Remove Saved Job
export async function saveJob({ job_id, alreadySaved }) {
  try {
    if (alreadySaved) {
      const response = await apiRequest({
        url: `/api/v1/jobs/unsave`,
        method: "DELETE",
        data: { job_id },
      });
    } else {
      const response = await apiRequest({
        url: `/api/v1/jobs/save`,
        method: "POST",
        data: { job_id },
      });
    }
  } catch (error) {
    throw new Error(error);
  }
}

// - job isOpen toggle 
export async function updateHiringStatus({ job_id }, isOpen) {
  const response = await apiRequest({
    url: `/api/v1/jobs/${job_id}`,
    method: "PATCH",
    data: { isOpen },
  });
}

// get my created jobs
export async function getMyJobs({ recruiter_id }) {
  try {
    const response = await apiRequest({
      url: `/api/v1/jobs/recruiter/${recruiter_id}`,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error Creating Job");
  }
}

// Delete job
export async function deleteJob({ job_id }) {

}

// - post job
export async function addNewJob(jobData) {
  try {
    const response = await apiRequest({
      url: "/api/v1/jobs",
      method: "POST",
      data: jobData,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error Creating Job");
  }
}
