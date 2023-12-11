class User {
  static URL = "/user";
  static key = "user";

  static setCurrent(user) {
    localStorage.setItem(this.key, JSON.stringify(user));
  }

  static unsetCurrent() {
    localStorage.removeItem(this.key);
  }

  static current() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  static fetch(callback) {
    createRequest({
      url: this.URL + "/register",
      method: "GET",
      responseType: "JSON",
      data: this.current(),
      callback: (err, response) => {
        if (response && response.user) {
          const user = {
            name: response.user.name,
            id: response.user.id,
          };
          User.setCurrent(user);
        } else {
          User.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }

  static login(data, callback) {
    createRequest({
      url: this.URL + "/login",
      method: "POST",
      responseType: "json",
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      },
    });
  }

  static register(data, callback) {
    createRequest({
      url: this.URL + "/register",
      method: "POST",
      responseType: "json",
      data,
      callback: (err, response) => {
        if (response && response.user) {
          const user = {
            name: response.user.name,
            id: response.user.id,
          };
          User.setCurrent(user);
        }
        callback(err, response);
      },
    });
  }

  static logout(callback) {
    createRequest({
      url: this.URL + "/logout",
      method: "POST",
      responseType: "json",
      data: this.current(),
      callback: (err, response) => {
        if (response) {
          User.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }
}
