jest.mock("../Common/storage-utilities.js");

import { fetchFocusTime, fetchLevel } from "../Common/storage-utilities.js";
import { calcExpEarned, calcPercentTimeFocused } from "./xp-utilities.js";

describe("xp-utilities", () => {
  beforeAll(() => {
    fetchFocusTime.mockResolvedValue(12_000);
    fetchLevel.mockResolvedValue(1);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("calcPercentTimeFocused", () => {
    it("calculates the correct percentage", async () => {
      expect(await calcPercentTimeFocused()).toBe(1);
    });
  });

  describe("calcExpEarned", () => {
    it("calculates the correct xp earned", async () => {
      expect(await calcExpEarned()).toBe(10);
    });
  });
});
