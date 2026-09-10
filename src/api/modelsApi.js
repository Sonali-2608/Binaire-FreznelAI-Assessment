const API_URL = import.meta.env.VITE_API_URL;

/**
 * @param {(data: any) => void} onSuccess
 * @param {(error: Error) => void} onError
 */
export function fetchModelsJson(onSuccess, onError) {
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => onSuccess(data))
    .catch((error) => onError(error));
}
