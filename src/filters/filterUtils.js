// Safetensor file count is a string in the API and is sometimes literally "TBD",
// so we parse defensively and treat anything non-numeric as "unknown".
export function parseSafetensorCount(model) {
  const n = Number(model.safetensor_file_count);
  return Number.isFinite(n) ? n : null;
}

function uniqueSorted(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

export function getPipelineOptions(models) {
  return uniqueSorted(models.map((m) => m.hf_tags?.pipeline_tag));
}

export function getFamilyOptions(models) {
  return uniqueSorted(models.map((m) => m.family));
}

export function getArchitectureOptions(models) {
  return uniqueSorted(models.flatMap((m) => m.hf_tags?.architecture || []));
}

export function getWeightOptions(models) {
  return uniqueSorted(models.flatMap((m) => m.hf_tags?.quantization || []));
}

/**
 * @param {import("../types/Model").Model[]} models
 * @param {import("../types/Model").FilterState} filters
 */
export function applyFilters(models, filters) {
  const min = filters.safetensorMin === "" ? null : Number(filters.safetensorMin);
  const max = filters.safetensorMax === "" ? null : Number(filters.safetensorMax);

  return models.filter((model) => {
    if (filters.pipeline && model.hf_tags?.pipeline_tag !== filters.pipeline) return false;
    if (filters.family && model.family !== filters.family) return false;
    if (filters.architecture && !(model.hf_tags?.architecture || []).includes(filters.architecture)) return false;
    if (filters.weight && !(model.hf_tags?.quantization || []).includes(filters.weight)) return false;

    if (min !== null || max !== null) {
      const count = parseSafetensorCount(model);
      if (count === null) return false; // unknown counts can't satisfy a numeric range
      if (min !== null && count < min) return false;
      if (max !== null && count > max) return false;
    }

    return true;
  });
}
