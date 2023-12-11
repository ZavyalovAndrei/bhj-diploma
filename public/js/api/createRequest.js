
const xhr = new XMLHttpRequest();
const createRequest = (options = {}) => {
  if (options && options.data && typeof options.data === 'object') {
    const xhr = new XMLHttpRequest();
    let formData = new FormData();
    let url = options.url;
    if (options.method !== 'GET') {
      Object.entries(options.data).forEach(([key, value]) =>
        formData.append(key, value)
      );
    } else if (!url.includes('/account')) {
      formData = '';
      url += '?';
      Object.entries(options.data).forEach(
        ([key, value]) => (url += `${key}=${value}&`)
      );
      url = url.slice(0, -1);
    }
    try {
      xhr.open(options.method, url);
      xhr.send(formData);
    } catch (err) {
      options.callback(err, null);
    }
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      options.callback(null, xhr.response);
    });
  }
};
