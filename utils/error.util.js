export function catchError(fn) {
  return async function (...args) {
    let response;
    
    try {
      response = await fn.apply(this, args);
      return response;
    } catch (error) {
      console.info(`Something went wrong while you have tried to ${fn.name}`);
      console.error(new Error(response, error));
    }
  };
}
