export default function useSubmit() {
  return async values => {
    return new Promise(resolve => {
      setTimeout(() => resolve("success"), 1000);
    });
  };
}
