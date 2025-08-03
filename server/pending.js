// Generic pending promise tracker for any async call
const pending = {};

export function pendingGuard(key, asyncFn) {
  if (pending[key]) {
    // Return the existing in-flight promise
    return pending[key];
  }
  // Start a new promise and store it
  pending[key] = Promise.resolve()
    .then(asyncFn)
    .finally(() => {
      delete pending[key];
    });
  return pending[key];
}
