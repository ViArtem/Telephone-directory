import Helpers from "../exсeptions/helpers.js";

describe("name, number validation", () => {
  //
  test("correct name and number", () => {
    expect(Helpers.dataValidation("hello test", "+380215478954")).toBe(false);
  });

  //
  test("incorrect name", () => {
    expect(Helpers.dataValidation("he1llo test", "+380215478954")).toEqual({
      message: "Name not valid",
    });
  });

  //
  test("incorrect number", () => {
    expect(Helpers.dataValidation("hello test", "+38097a697641")).toEqual({
      message: "Number not valid",
    });
  });

  //
  test("number and name have empty values", () => {
    expect(Helpers.dataValidation(" ", "")).toEqual({
      message: "The value cannot be empty",
    });
  });

  //
  test("name has a value of undefined", () => {
    expect(Helpers.dataValidation(undefined, "+380215478954")).toEqual({
      message: "Value not valid",
    });
  });

  //
  test("name has a value of null", () => {
    expect(Helpers.dataValidation(null, "+380215478954")).toEqual({
      message: "Value not valid",
    });
  });

  //
  test("number has a value of undefined", () => {
    expect(Helpers.dataValidation("Oleg Romanenko", undefined)).toEqual({
      message: "Value not valid",
    });
  });

  //
  test("number has a value of null", () => {
    expect(Helpers.dataValidation("Oleg Romanenko", null)).toEqual({
      message: "Value not valid",
    });
  });

  //
  test("number and name has a value of null", () => {
    expect(Helpers.dataValidation(null, null)).toEqual({
      message: "Value not valid",
    });
  });
});
