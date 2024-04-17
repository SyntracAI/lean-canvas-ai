export const getDefaultEnv = async () => {
  try {
    const env = {
      ...process.env,
    };
    return env;
  } catch (_) {
    return {
      ...process.env,
    };
  }
};
