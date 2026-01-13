class MyPromise {
  static resolve(x) {
    if (x instanceof MyPromise) return x;
    return new MyPromise((resolve) => resolve(x));
  }

  static reject(x) {
    return new MyPromise((resolve, reject) => {
      reject(x);
    });
  }
  static all(iterable) {
    return new MyPromise((resolve, reject) => {
      const arr = Array.from(iterable);
      const n = arr.length;
      const results = new Array(n);
      let count = 0;
      if (n === 0) return resolve([]);
      arr.forEach((item, index) => {
        MyPromise.resolve(item).then(
          (value) => {
            results[index] = value;
            count++;
            if (count === n) resolve(results);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }
  static race(iterable) {
    return new MyPromise((resolve, reject) => {
      for (const item of iterable) {
        MyPromise.resolve(item).then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }

  static allSettled(iterable) {
    return new MyPromise((resolve) => {
      const arr = Array.from(iterable);
      const n = arr.length;
      let count = 0;
      const results = new Array(n);
      if (n === count) return resolve([]);
      arr.forEach((item, index) => {
        MyPromise.resolve(item).then(
          (value) => {
            results[index] = {
              status: "fulfilled",
              value,
            };
            count++;
            if (count === n) return resolve(results);
          },
          (reason) => {
            results[index] = {
              status: "rejected",
              reason,
            };
            count++;
            if (count === n) return resolve(results);
          }
        );
      });
    });
  }

  static any(iterable) {
    return new MyPromise((resolve, reject) => {
      const arr = Array.from(iterable);
      const n = arr.length;
      const errors = new Array(n);
      let rejectedCount = 0;
      let lock = false;
      if (n === 0) return reject(new AggregateError([]));
      arr.forEach((item, index) => {
        MyPromise.resolve(item).then(
          (value) => {
            if (lock) return;
            lock = true;
            resolve(value);
          },
          (reason) => {
            errors[index] = reason;
            rejectedCount++;
            if (rejectedCount === n) reject(new AggregateError(errors));
          }
        );
      });
    });
  }

  constructor(executor) {
    this.state = "pending";
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    this.resolve = (value) => {
      if (this.state === "pending") {
        if (value === this) {
          return this.reject(
            new TypeError("Chaining cycle detected for promise #<promise>")
          );
        }

        if (
          (typeof value === "object" && value !== null) ||
          typeof value === "function"
        ) {
          let then;
          try {
            then = value.then;
          } catch (e) {
            return this.reject(e);
          }

          if (typeof then === "function") {
            let called = false;
            try {
              return then.call(
                value,
                (y) => {
                  if (called) return;
                  called = true;
                  this.resolve(y);
                },
                (r) => {
                  if (called) return;
                  called = true;
                  this.reject(r);
                }
              );
            } catch (e) {
              if (called) return;
              called = true;
              return this.reject(e);
            }
          }
        }
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };
    this.reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (error) => {
            throw error;
          };

    let promise2 = new MyPromise((resolve, reject) => {
      const handleCallback = (callback, stateValue) => {
        queueMicrotask(() => {
          try {
            const x = callback(stateValue);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };
      if (this.state === "pending") {
        this.onFulfilledCallbacks.push(() =>
          handleCallback(onFulfilled, this.value)
        );
        this.onRejectedCallbacks.push(() =>
          handleCallback(onRejected, this.reason)
        );
      }
      if (this.state === "fulfilled") {
        handleCallback(onFulfilled, this.value);
      }
      if (this.state === "rejected") {
        handleCallback(onRejected, this.reason);
      }
    });

    return promise2;
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => {
        return MyPromise.resolve(callback()).then(() => value);
      },
      (reason) => {
        return MyPromise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  }
}

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<promise>")
    );
  }

  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let called = false;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};
