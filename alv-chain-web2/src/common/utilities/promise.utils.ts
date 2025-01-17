const invertPromise = <T>(promise: Promise<T>): Promise<T> =>
  new Promise((res, rej) => promise.then(rej).catch(res));

export const promiseFirst = <T>(promises: Array<Promise<T>>) =>
  invertPromise(Promise.all(promises.map(invertPromise)));
