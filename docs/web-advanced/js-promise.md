# JavaScript 中的 Promise

## 1. 什么是 Promise？

Promise 是 JavaScript 中用于处理异步操作的对象。它代表一个异步操作的最终完成（或失败）及其结果值。Promise 有三种状态：

- Pending（等待）：初始状态，既不是成功，也不是失败。

- Fulfilled（已完成）：操作成功完成。

- Rejected（已拒绝）：操作失败。

## 2. 创建 Promise

Promise 通过 new Promise() 构造函数创建，接受一个执行器函数（executor），该函数有两个参数：resolve 和 reject。

```javascript
const myPromise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("操作成功！");
    } else {
      reject("操作失败！");
    }
  }, 1000);
});
```

**resolve 和 reject 的本质**

- resolve：将 Promise 的状态从 pending（等待）变为 fulfilled（已完成），并传递一个值作为成功的结果。

- reject：将 Promise 的状态从 pending（等待）变为 rejected（已拒绝），并传递一个值（通常是错误信息）作为失败的原因。

它们只是普通的 JavaScript 函数，由 Promise 内部实现并传递给执行器函数。

** resolve 和 reject 的参数**

- resolve(value)：

	- value 是 Promise 成功时传递的值，可以是任意类型（如字符串、数字、对象等）。

	- 如果 value 是一个 Promise，则当前 Promise 的状态会由这个传入的 Promise 决定（即“跟随”这个 Promise 的状态）。

	- 如果 value 是一个普通值，则 Promise 直接变为 fulfilled，并将 value 作为结果。

- reject(reason)：

	- reason 是 Promise 失败时传递的原因，通常是错误信息（如字符串、Error 对象等）。

	- reason 可以是任意类型，但通常是一个 Error 对象，以便更好地追踪错误。

## 3. 使用 Promise

Promise 对象有两个主要方法用于处理结果：

- then()：处理成功状态。

- catch()：处理失败状态。

```javascript
myPromise
  .then((result) => {
    console.log(result); // 输出: 操作成功！
  })
  .catch((error) => {
    console.error(error); // 输出: 操作失败！
  });
```

then() 和 catch() 是 Promise 对象的核心方法，用于处理 Promise 的成功或失败状态。它们的参数是回调函数，具体如下：

**then() 方法**

then() 用于处理 Promise 的成功状态（fulfilled）。它接受两个可选参数：

- 第一个参数：成功时的回调函数（onFulfilled）。

- 第二个参数：失败时的回调函数（onRejected）。

语法：

```
promise.then(onFulfilled, onRejected);
```

参数说明：

- onFulfilled(value)：

	- 当 Promise 成功时调用。

	- value 是 resolve 传递的值。

	- 如果未提供此函数，则成功状态会向下传递到链中的下一个 then。

- onRejected(reason)：

	- 当 Promise 失败时调用。

	- reason 是 reject 传递的原因（通常是错误信息）。

	- 如果未提供此函数，则失败状态会向下传递到链中的下一个 catch 或 then 的第二个参数。

示例：

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功！");
    // reject("失败！");
  }, 1000);
});

myPromise.then(
  (value) => {
    console.log("成功：", value); // 输出: 成功： 成功！
  },
  (reason) => {
    console.error("失败：", reason); // 如果 reject 被调用，输出: 失败： 失败！
  }
);
```

**catch() 方法**

catch() 用于处理 Promise 的失败状态（rejected）。它相当于 then(null, onRejected) 的简写形式。

语法：

```
promise.catch(onRejected);
```

参数说明：

- onRejected(reason)：

	- 当 Promise 失败时调用。

	- reason 是 reject 传递的原因（通常是错误信息）。

示例：

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("失败！");
  }, 1000);
});

myPromise
  .then((value) => {
    console.log("成功：", value); // 不会执行
  })
  .catch((reason) => {
    console.error("失败：", reason); // 输出: 失败： 失败！
  });
```

**then() 和 catch() 的链式调用**

then() 和 catch() 都会返回一个新的 Promise，因此可以链式调用。

链式调用示例：

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 1000);
});

myPromise
  .then((value) => {
    console.log("第一步成功：", value); // 输出: 第一步成功： 10
    return value * 2; // 返回一个新值，传递给下一个 then
  })
  .then((value) => {
    console.log("第二步成功：", value); // 输出: 第二步成功： 20
    throw new Error("手动抛出错误"); // 抛出错误，触发 catch
  })
  .catch((reason) => {
    console.error("捕获错误：", reason.message); // 输出: 捕获错误： 手动抛出错误
  });
```

**then() 和 catch() 的返回值**

- then() 和 catch() 的返回值：

	- 如果回调函数返回一个值，则新的 Promise 会以该值作为结果。

	- 如果回调函数抛出错误，则新的 Promise 会以该错误作为失败原因。

	- 如果回调函数返回一个 Promise，则新的 Promise 会“跟随”这个返回的 Promise 的状态。

示例：

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 1000);
});

myPromise
  .then((value) => {
    console.log("第一步成功：", value); // 输出: 第一步成功： 10
    return new Promise((resolve) => {
      setTimeout(() => resolve(value * 2), 1000); // 返回一个新的 Promise
    });
  })
  .then((value) => {
    console.log("第二步成功：", value); // 1秒后输出: 第二步成功： 20
  })
  .catch((reason) => {
    console.error("捕获错误：", reason);
  });
```

**小结**

- then(onFulfilled, onRejected)：

	- 用于处理成功或失败状态。

	- 第一个参数是成功回调，第二个参数是失败回调（可选）。

- catch(onRejected)：

	- 用于处理失败状态，是 then(null, onRejected) 的简写。

- 链式调用：

	- then() 和 catch() 都会返回一个新的 Promise，支持链式调用。

- 返回值：

	- 回调函数的返回值会决定新的 Promise 的状态和结果。

通过 then() 和 catch()，你可以清晰地处理 Promise 的成功和失败状态，并构建复杂的异步逻辑。

## 4. Promise 链

then() 方法可以链式调用，每个 then() 返回一个新的 Promise，允许进一步的异步操作。

```javascript
myPromise
  .then((result) => {
    console.log(result); // 输出: 操作成功！
    return "继续处理";
  })
  .then((newResult) => {
    console.log(newResult); // 输出: 继续处理
  })
  .catch((error) => {
    console.error(error);
  });
```

## 5. Promise 的静态方法

- Promise.resolve(value)：返回一个已解决的 Promise。

- Promise.reject(reason)：返回一个已拒绝的 Promise。

- Promise.all(iterable)：所有 Promise 都成功时返回结果数组，任何一个失败则立即拒绝。

- Promise.race(iterable)：第一个完成的 Promise 决定结果。

```javascript
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(resolve, 100, 'foo'));
const promise3 = Promise.reject("出错");

Promise.all([promise1, promise2])
  .then((values) => {
    console.log(values); // 输出: [3, "foo"]
  })
  .catch((error) => {
    console.error(error);
  });

Promise.race([promise1, promise2])
  .then((value) => {
    console.log(value); // 输出: 3
  });
```

## 6. 错误处理

除了 catch()，还可以在 then() 中传入第二个函数处理错误。

```javascript
myPromise
  .then(
    (result) => {
      console.log(result);
    },
    (error) => {
      console.error(error);
    }
  );
```

## 7. 异步函数与** async/await**

async/await 是处理 Promise 的语法糖，使异步代码看起来像同步代码。

```javascript
async function myAsyncFunction() {
  try {
    const result = await myPromise;
    console.log(result); // 输出: 操作成功！
  } catch (error) {
    console.error(error);
  }
}

myAsyncFunction();
```

## 总结

Promise 是 JavaScript 中处理异步操作的核心工具，通过 then() 和 catch() 方法处理结果，支持链式调用和错误处理。async/await 进一步简化了 Promise 的使用，使代码更易读和维护。