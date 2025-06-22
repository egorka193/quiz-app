
export const fakeApiRequest = <T>(response: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, getFakeDelay());
  });
};

export const getFakeDelay = () => {
  const minimalDelay = 200;
  const randomDelay = Math.random() * 1000;
  return Math.max(randomDelay, minimalDelay);
};

