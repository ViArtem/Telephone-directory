import Helpers from "../exсeptions/helpers.js";

describe("name, number validation", () => {
  //
  test("correct name and number", () => {
    expect(Helpers.dataValidation("hello test", "+380977697641")).toBe(true);
  });
  //
  test("incorrect name", () => {
    expect(Helpers.dataValidation("he1llo test", "+380977697641")).toEqual({
      message: "Name not valid",
    });
  });

  //
  test("incorrect number", () => {
    expect(Helpers.dataValidation("hello test", "+38097a697641")).toEqual({
      message: "Number not valid",
    });
  });
});
