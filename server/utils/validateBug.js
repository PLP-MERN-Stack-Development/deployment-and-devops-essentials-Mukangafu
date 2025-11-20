export const validateBug = (data) => {
  if (!data.title) return "Title is required";
  return null;
};
