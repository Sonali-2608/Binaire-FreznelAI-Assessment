import { fetchModelsJson } from "../api/modelsApi";
import { CacheService } from "../offline/CacheService";

// Domain-level service for loading models: fetch -> validate -> cache,
// with an offline/cached-data fallback. Kept as a class per the OOP requirement.
export class ModelService {
  /**
   * @param {(models: import("../types/Model").Model[], meta: {fromCache: boolean}) => void} onSuccess
   * @param {(error: Error) => void} onError
   */
  static loadModels(onSuccess, onError) {
    if (!navigator.onLine) {
      const cached = CacheService.load();
      if (cached) {
        onSuccess(cached, { fromCache: true });
      } else {
        onError(new Error("You're offline and no cached models are available yet."));
      }
      return;
    }

    fetchModelsJson(
      (data) => {
        const isValid =
          data && Array.isArray(data.models) && data.models.every((m) => m && typeof m.id === "string");

        if (!isValid) {
          // The old cache is preserved and used as a fallback until a new, successfully
          // parsed and validated response comes in — we never overwrite it with bad data.
          const cached = CacheService.load();
          if (cached) {
            onSuccess(cached, { fromCache: true });
          } else {
            onError(new Error("The API returned data in an unexpected format."));
          }
          return;
        }

        // Only now that the JSON has been successfully parsed and validated do we save it,
        // replacing whatever was previously cached.
        CacheService.save(data.models);
        onSuccess(data.models, { fromCache: false });
      },
      (error) => {
        // Network/parsing error — keep serving the last valid cache instead of an empty screen.
        const cached = CacheService.load();
        if (cached) {
          onSuccess(cached, { fromCache: true });
        } else {
          onError(error);
        }
      }
    );
  }
}
