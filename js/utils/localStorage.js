import * as constants from "../constants/index.js";

export function saveToStorage(value) {
  localStorage.setItem(constants.storageKey, JSON.stringify(value));
}

export function loadFromStorage() {
  const value = localStorage.getItem(constants.storageKey);
  return JSON.parse(value) || [];
}

export function removeFromStorage() {
  localStorage.removeItem(constants.storageKey);
}
