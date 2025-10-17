# ALX Project 0x14: MoviesDatabase API Integration

## API Overview

The **MoviesDatabase API** provides access to detailed and up-to-date information about over **9 million titles**, including movies, series, and episodes. The API supports weekly updates for recent titles and daily updates for ratings and episode data. It's designed for developers to query title data, search by various criteria, retrieve ratings, get information about actors, and more.

Key features include:

- Searching for titles by keyword, name, or alternate names.
- Retrieving details of specific movies, series, episodes, and actors.
- Accessing curated title lists like “Most Popular Movies” and “Top Rated Series.”
- Getting ratings, cast info, genres, and production details.
- Navigating episodes and seasons for series.

---

## Version

**v1 (Latest)**  
The API documentation does not specify a version number, but this guide is based on the latest available documentation as of now.

---

## Available Endpoints

### 🎬 Titles

- `GET /titles`  
  Returns an array of titles based on provided filters or sort criteria.

- `GET /titles/{id}`  
  Returns detailed info about a specific title by IMDb ID.

- `GET /titles/{id}/ratings`  
  Returns ratings and vote count for a title.

- `GET /x/titles-by-ids`  
  Returns titles based on an array of IMDb IDs.

- `GET /titles/x/upcoming`  
  Returns upcoming titles based on filters.

### 📺 Series & Episodes

- `GET /titles/series/{id}`  
  Returns episodes (IDs, season and episode numbers) of a series.

- `GET /titles/seasons/{id}`  
  Returns the number of seasons for a series.

- `GET /titles/series/{id}/{season}`  
  Returns episodes for a specific season of a series.

- `GET /titles/episode/{id}`  
  Returns details for a specific episode.

### 🔍 Search

- `GET /titles/search/keyword/{keyword}`  
  Searches titles by keyword.

- `GET /titles/search/title/{title}`  
  Searches titles by name or part of name.

- `GET /titles/search/akas/{aka}`  
  Searches titles by alternate name (exact and case-sensitive).

### 👤 Actors

- `GET /actors`  
  Returns a list of actors.

- `GET /actors/{id}`  
  Returns detailed info for an actor.

### 🧰 Utils

- `GET /title/utils/titleType`  
  Returns all available title types.

- `GET /title/utils/lists`  
  Returns predefined title lists for filtering.

- `GET /title/utils/genres`  
  Returns all available genres.

---

## Request and Response Format

### Example Request

```http
GET /titles/search/title/Inception?info=mini_info&exact=true
```

## Authentication

**No authentication is required.**

The MoviesDatabase API is public and does not require an API key, token, or any other form of authentication. All endpoints are accessible without registering or providing credentials.

However, this may change in future updates. Always refer to the official documentation or changelogs for updates regarding authentication.

## Error Handling

Common error responses include:

400 Bad Request: Invalid query parameters.

404 Not Found: Resource not found (e.g., invalid ID).

500 Internal Server Error: API issue on server side.

Best practices:

Validate query params before making a request.

Always check response status codes.

Use try...catch in your code to gracefully handle failures.

## Error Handling

The API may return standard HTTP status codes to indicate the success or failure of a request. While the documentation does not specify a detailed error response format, you can expect the following:

### Common Error Responses:

| Status Code | Meaning               | Description                                            |
| ----------- | --------------------- | ------------------------------------------------------ |
| 400         | Bad Request           | Invalid query parameters or malformed request          |
| 404         | Not Found             | Requested resource (e.g., title or actor ID) not found |
| 500         | Internal Server Error | A problem occurred on the API server                   |

### Example Error Handling in Code (TypeScript/JavaScript):

```ts
try {
  const response = await fetch("https://example.com/titles");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error("Failed to fetch data:", error);
}
```

---

### ✅ Usage Limits and Best Practices

```markdown
## Usage Limits and Best Practices

The API documentation does not specify exact usage limits or rate limits. However, you should assume general public API best practices apply to avoid being blocked or rate-limited in the future.

### 🔁 Rate Limits

No specific rate limits are documented, but it's good practice to:

- Avoid sending excessive requests in short time spans.
- Implement caching where appropriate (e.g., static lists, actor profiles).
- Use `limit` and `page` query parameters to paginate results instead of loading large datasets at once.

### 🧠 Best Practices

- **Use `info` filtering**: Add the `info` query parameter (`mini_info`, `base_info`, etc.) to reduce payload size and improve performance.
- **Use predefined lists**: Query curated collections (e.g., `top_rated_250`) for popular or top-rated content.
- **Use pagination**: Avoid loading too many results at once. Use `limit` (max 50) and `page` to control data flow.
- **Validate inputs**: Ensure valid query parameters and values before making API calls.
- **Gracefully handle missing data**: Always check for the existence of data fields (e.g., `primaryImage`, `ratingsSummary`) as they may be null or undefined.

By following these practices, you ensure a smooth integration while being respectful of the API provider’s infrastructure.
```
