import { describe, expect, it } from "vitest";

describe("integration smoke", () => {
  it("runs basic integration assertion", () => {
    expect(["vi", "en"]).toContain("vi");
  });
});
