export const waitTime = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
