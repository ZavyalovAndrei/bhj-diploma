/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  let { url, data, method = "GET", callback } = options;
  const formData = new FormData();
  if (method === "GET") {
    url = url + "?";
    for (let key in data) {
      url += key + "=" + data[key] + "&";
    }
    url = url.slice(0, -1);
  } else {
    for (let key in data) {
      formData.append(key, data[key]);
    }
  }
  xhr.open(method, url);
  xhr.send(formData);
  xhr.onerror = function () {
    if (typeof callback === "function") {
      callback(new Error("Произошла ошибка при загрузке данных на сервер!"));
    }
  };
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == xhr.DONE) {
      if (xhr.status === 200) {
        if (typeof callback === "function") {
          callback(null, xhr.response);
        }
      } else {
        if (typeof callback === "function") {
          callback(new Error(`Request failed with status: ${xhr.status}`));
        }
      }
    }
  });
};
