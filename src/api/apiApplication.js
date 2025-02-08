import { apiRequest } from "@/lib/api";

// - Apply to job ( candidate )
export async function applyToJob(jobData) {
  const response = await apiRequest({
    url: '/api/v1/applications',
    method: 'POST',
    data: jobData
  })

  return response.data
}

// - Edit Application Status ( recruiter )
export async function updateApplicationStatus({application_id, status}) {
  await apiRequest({
    url: `/api/v1/applications/${application_id}`,
    method: 'PATCH',
    data: {status}
  })

}

export async function getApplications() {
  const response = await apiRequest({
    url: '/api/v1/applications'
  })

  return response.data
}
