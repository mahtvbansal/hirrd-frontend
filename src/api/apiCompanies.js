import { apiRequest } from "@/lib/api";

// Fetch Companies
export async function getCompanies(token) {
  try {
    const companies = await apiRequest({ url : '/api/v1/companies'})
    return companies.data;
  } catch (error) {
    return []
  }
  
}

// Add Company
export async function addNewCompany(token, _, companyData) {
  const formData = new FormData();
  formData.append("name", companyData.name);
  formData.append("logo", companyData.logo);
  try {
    const uploadCompany = await apiRequest({ url: '/api/v1/companies', method: 'POST', data : formData})
  } catch (error) {
    console.log(error)
  }
  return []
}
