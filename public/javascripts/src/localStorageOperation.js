function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, value,callback) {
  localStorage.setItem(key, JSON.stringify(value));
}
