jest.mock("../Common/storage-utilities");

import { calcExpEarned, calcLevelUpXp, calcPercentTimeFocused, shouldLevelUp } from "./xp-utilities";
import { fetchFocusTime, fetchLevel } from "../Common/storage-utilities";



describe("xp-utilities", () => {
    beforeAll(() => {
        fetchFocusTime.mockResolvedValue(12000);
        fetchLevel.mockResolvedValue(1);
    })
    afterAll(() => {
        jest.restoreAllMocks();
    })
    
    describe("calcPercentTimeFocused", () => {
        it("calculates the correct percentage", async () => {
            expect(await calcPercentTimeFocused()).toBe(1);
        })
    })
    describe("calcExpEarned", () => {
        it("calculates the correct xp earned", async () => {
            chrome.storage.local.get.mockResolvedValue({ crab: { xp: 0 } });
            expect(await calcExpEarned()).toBe(10);
            expect(chrome.storage.local.set).toHaveBeenCalled();
        })
    })

    describe("calcLevelUpXp", () => {
        it("calculates the correct new xp to level up", () => {
            expect(calcLevelUpXp(2)).toBe(240);
        })
    })
    describe("shouldLevelUp", () => {
        it("returns true when xp > xp required to level up", () => {
            expect(shouldLevelUp(1000, 1)).toBe(true);
        });
        it("returns false when xp < xp required to level up", () => {
            expect(shouldLevelUp(1, 999)).toBe(false);
        })
    })
})


