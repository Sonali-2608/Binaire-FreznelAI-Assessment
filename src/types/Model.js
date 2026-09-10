
/**
 * @typedef {Object} HfTags
 * @property {string} pipeline_tag
 * @property {string[]} architecture
 * @property {string[]} quantization
 * @property {string[]} all_tags
 */

/**
 * @typedef {Object} Model
 * @property {string} id
 * @property {string} display_name
 * @property {string} family
 * @property {string} architecture_category
 * @property {string} safetensor_file_count - sometimes "TBD", not always numeric
 * @property {HfTags} hf_tags
 */

/**
 * @typedef {Object} FilterState
 * @property {string} pipeline
 * @property {string} family
 * @property {string} architecture
 * @property {string} weight
 * @property {string} safetensorMin
 * @property {string} safetensorMax
 */

export const SORT_KEYS = {
  SAFETENSOR_COUNT: "safetensor_count",
  NAME_ASC: "name_asc",
  NAME_DESC: "name_desc",
};

/** @type {FilterState} */
export const emptyFilterState = {
  pipeline: "",
  family: "",
  architecture: "",
  weight: "",
  safetensorMin: "",
  safetensorMax: "",
};
