import config from "../config";

export const FILES_FULL_PATH = config.blobUrl + config.blobContainer;

export const APARTMENTS_PATH = FILES_FULL_PATH + "/apartments/";
export const PROJECTS_PATH = FILES_FULL_PATH + "/projects/";
export const ASSETS_PATH = FILES_FULL_PATH + "/assets/";

export const APARTMENT_TYPES = [
  { value: 1, label: "Deluxe Portion" },
  { value: 2, label: "Penthouse" },
  { value: 3, label: "Top Garden" },
  { value: 4, label: "Double Height" },
];

export const PRICE_RANGE = [
  { value: 0, label: "1M-10M" },
  { value: 10, label: "10M - 20M" },
  { value: 30, label: "30M - 40M" },
  { value: 40, label: "40M - 50M" },
  { value: 50, label: "50M+" },
];

export const CHART_TIMESCALE = {
  FiveDays: 1,
  OneMonth: 2,
  SixMonths: 3,
  YearToDate: 4,
  Max: 5,
};
