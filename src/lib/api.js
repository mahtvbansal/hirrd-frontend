export const apiRequest = async ({ url, method = "GET", data = null }) => {
  try {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const options = {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    if (method === "GET" && data) {
      // Append query parameters for GET requests
      const queryParams = new URLSearchParams(data).toString();
      url += `?${queryParams}`;
    } else if (data instanceof FormData) {
      options.body = data; // Don't set Content-Type for FormData
    } else if (data) {
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(data);
    }

    const response = await fetch(baseUrl + url, options);

    if (!response.ok) {
      const errorData = await response.json(); // Try to parse error response
      const errorMessage =
        errorData.error?.explaination || `Error: ${response.status} ${response.statusText}`; // Use error message from the server or default message
      if (errorData.error?.statusCode === 401) {
        localStorage.clear();
      }
      throw new Error(errorMessage); // Throw the error to be caught by the catch block
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
