const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchGeneratedContent = async (question) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
};
