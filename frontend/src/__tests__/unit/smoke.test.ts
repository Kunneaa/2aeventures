import { describe, expect, it } from "vitest";
import { defaultLocale, isValidLocale, locales } from "../../i18n";
import viMessages from "../../../messages/vi.json";
import enMessages from "../../../messages/en.json";

describe("i18n configuration", () => {
  it("keeps locale metadata valid", () => {
    expect(locales).toEqual(["vi", "en"]);
    expect(isValidLocale(defaultLocale)).toBe(true);
    expect(isValidLocale("fr")).toBe(false);
  });

  it("keeps Vietnamese and English messages in sync", () => {
    expect(Object.keys(enMessages).sort()).toEqual(Object.keys(viMessages).sort());
  });
});
