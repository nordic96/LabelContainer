import LabelContainer from "../LabelContainer";
import { Labels } from "../types";

const mockLabels: Labels = {
  HOME: {
    en: {
      welcome: "Welcome Home",
      logout: "Logout",
    },
    fr: {
      welcome: "Bienvenue à la maison",
    },
  },
  GLOBAL: {
    en: {
      ok: "OK",
      cancel: "Cancel",
    },
    fr: {
      ok: "D'accord",
    },
  },
};

describe("LabelContainer", () => {
  beforeEach(() => {
    // Reset singleton instance before each test
    // @ts-ignore - accessing private field for testing
    LabelContainer["instance"] = undefined;
  });

  describe("Singleton Behavior", () => {
    it("should return the same instance for multiple getInstance() calls", () => {
      const instanceA = LabelContainer.getInstance();
      const instanceB = LabelContainer.getInstance();
      expect(instanceA).toBe(instanceB);
    });

    it("should initialize with provided initial values on first getInstance() call", () => {
      const instance = LabelContainer.getInstance({ page: "HOME", language: "fr", labels: mockLabels });
      expect(instance.getPage()).toBe("HOME");
      expect(instance.getLanguage()).toBe("fr");
    });

    it("should ignore later initial values after first initialization", () => {
      const instanceA = LabelContainer.getInstance({ page: "HOME", language: "en", labels: mockLabels });
      const instanceB = LabelContainer.getInstance({ page: "OTHER", language: "jp" });
      expect(instanceA).toBe(instanceB);
      expect(instanceB.getPage()).toBe("HOME"); // unchanged
      expect(instanceB.getLanguage()).toBe("en"); // unchanged
    });
  });

  describe("Label Storage and Retrieval", () => {
    let instance: LabelContainer;
    beforeEach(() => {
      instance = new LabelContainer({ labels: mockLabels, page: "HOME", language: "en" });
    });

    it("should return label for key in current page/language", () => {
      expect(instance.getLabel("welcome")).toBe("Welcome Home");
    });

    it("should fall back to GLOBAL page when key missing in current page", () => {
      instance.setPage("UNKNOWN_PAGE");
      expect(instance.getLabel("ok")).toBe("OK");
    });

    it("should fall back to English (en) language if selected language missing", () => {
      instance.setLanguage("de"); // German missing
      expect(instance.getLabel("welcome")).toBe("Welcome Home");
    });

    it("should return key itself when no label found anywhere", () => {
      instance.setPage("UNKNOWN_PAGE");
      expect(instance.getLabel("not_exist")).toBe("not_exist");
    });

    it("should confirm existence of label with hasLabel()", () => {
      expect(instance.hasLabel("welcome")).toBe(true);
      expect(instance.hasLabel("does_not_exist")).toBe(false);
    });
  });

  describe("Language and Page Management", () => {
    let instance: LabelContainer;
    beforeEach(() => {
      instance = new LabelContainer({ labels: mockLabels });
    });

    it("should set and return current page correctly", () => {
      instance.setPage("HOME");
      expect(instance.getPage()).toBe("HOME");
    });

    it("should set and return current language correctly", () => {
      instance.setLanguage("fr");
      expect(instance.getLanguage()).toBe("fr");
    });

    it("should list all available languages across all pages", () => {
      const langs = instance.getAllLanguages();
      expect(langs.sort()).toEqual(["en", "fr"].sort());
    });

    it("should return empty array when labels are empty", () => {
      const emptyInstance = new LabelContainer();
      expect(emptyInstance.getAllLanguages()).toEqual([]);
    });
  });
});