import {
  convertUrlToRegExp,
  isUrlBlocked,
  removePrefixFromUrl,
} from "./storage-utilities.js";
/*Other test cases: 
    block both http and https sites
*/

describe("storage utilities", () => {
  describe("isUrlBlocked", () => {
    it("matches www.youtube.com when given youtube.com", () => {
      let result = isUrlBlocked("https://www.youtube.com", [
        "https://youtube.com",
      ]);

      expect(result).toBe(true);
    });

    it("matches subpages of blocked website", () => {
      let result = isUrlBlocked("https://www.youtube.com/watch?v=dQw4w9WgXcQ", [
        "https://www.youtube.com",
      ]);

      expect(result).toBe(true);
    });

    it("doesn't match google search of url", () => {
      let result = isUrlBlocked("https://www.google.com/search?q=youtube", [
        "https://www.youtube.com",
      ]);

      expect(result).toBe(false);
    });

    it("doesn't match google search of subdomain of url", () => {
      let result = isUrlBlocked(
        "https://www.google.com/search?q=https%3A%2F%2Fwww.youtube.com",
        ["https://www.youtube.com"],
      );

      expect(result).toBe(false);
    });
  });

  describe("convertUrlToRegExp", () => {
    it("Correctly converts https url to a regExp pattern", () => {
      let result = convertUrlToRegExp("https://youtube.com");

      expect(result.source).toBe(
        "https?:\\/\\/([a-z0-9]+[.])*youtube.com(\\/.*)?",
      );
    });
  });

  describe("removePrefixFromUrl", () => {
    it("Correctly generates a substring of url w/o https://", () => {
      let result = removePrefixFromUrl("https://youtube.com");

      expect(result).toBe("youtube.com");
    });
  });
});
