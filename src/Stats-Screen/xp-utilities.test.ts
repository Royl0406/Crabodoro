jest.mock("../Common/storage-utilities");

import { calcExpEarned, calcLevelUpXp, calcPercentTimeFocused} from "./xp-utilities";
import { fetchFocusTime, fetchLevel } from "../Common/storage-utilities";

declare global {
    export const chrome: any;
}

describe("xp-utilities", () => {
    beforeAll(() => {
        (fetchFocusTime as any).mockResolvedValue(12000);
        (fetchLevel as any).mockResolvedValue(1);
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
})


