jest.mock("../Common/storage-utilities");

import { calcTotalExpEarned, calcLevelUpXp, calcTotalPercentTimeFocused} from "./xp-utilities";
import { fetchTotalFocusTime, fetchLevel } from "../Common/storage-utilities";

declare global {
    export const chrome: any;
}

describe("xp-utilities", () => {
    beforeAll(() => {
        (fetchTotalFocusTime as any).mockResolvedValue(12000);
        (fetchLevel as any).mockResolvedValue(1);
    })
    afterAll(() => {
        jest.restoreAllMocks();
    })
    
    describe("calcPercentTimeFocused", () => {
        it("calculates the correct percentage", async () => {
            expect(await calcTotalPercentTimeFocused()).toBe(1);
        })
    })
    describe("calcExpEarned", () => {
        it("calculates the correct xp earned", async () => {
            chrome.storage.local.get.mockResolvedValue({ crab: { xp: 0 } });
            expect(await calcTotalExpEarned()).toBe(10);
            expect(chrome.storage.local.set).toHaveBeenCalled();
        })
    })

    describe("calcLevelUpXp", () => {
        it("calculates the correct new xp to level up", () => {
            expect(calcLevelUpXp(2)).toBe(240);
        })
    })
})


