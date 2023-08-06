class Ok {
  constructor(value) {
    this.value = value;
  }
  isOk() {
    return true;
  }
  isErr() {
    return false;
  }
  unwrap_or() {
    return this.value;
  }
  unwrap() {
    return this.value;
  }
}

class Err {
  constructor(error) {
    this.error = error;
  }
  isOk() {
    return false;
  }
  isErr() {
    return true;
  }
  unwrap_or(default_) {
    return default_;
  }
  unwrap() {
    throw this.error;
  }
}

window.Ok = Ok;
window.Err = Err;
