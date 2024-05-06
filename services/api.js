// const API_KEY = "AIzaSyBtGaliMMof_6FS8qZe6BgxWGrXJL7kuRk";

// api.js
export const getSearchResults = async (query) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&key=AIzaSyBtGaliMMof_6FS8qZe6BgxWGrXJL7kuRk`
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error searching for books:", error);
    return [];
  }
};

export const getBookDetails = async (bookId) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyBtGaliMMof_6FS8qZe6BgxWGrXJL7kuRk`
    );
    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Error fetching book details:", error);
    return null;
  }
};
