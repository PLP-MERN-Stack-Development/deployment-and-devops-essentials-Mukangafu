import { validateBug } from "../utils/validateBug.js";

test("should return error when title is missing", () => {
  expect(validateBug({})).toBe("Title is required");
});

test("should return null when valid", () => {
  expect(validateBug({ title: "Bug A" })).toBe(null);
});
