import { createApp } from "vue";

const HELP_HEADER = [
  "Header (html, <h1> on plain text)",
  'Namespace (optional, "default" by default)',
  'Hue, Saturation (optional, "180, 30%" by default)',
];
const HELP_PART_1 = [
  "Number of variables shown (0+)",
  "Variable Name, Lucide Icon, Default value (js, default to 0)",
];
const HELP_PART_2 = [
  "Number of changes (0+)",
  "Variable Name = Value change (js)",
];
const HELP_PART_3 = ["Condition (js)", "Data (html)"];
const DEFAULT_VALUES = {
  header: "",
  namespace: "default",
  hasNamespace: true,
  hasColor: true,
  hasVars: false,
  shownVars: [],
  hasChanges: false,
  changes: [],
  data: [],
};

const utils = {
  base64URLTobase64(str) {
    const base64Encoded = str.replace(/-/gu, "+").replace(/_/gu, "/");
    const padding =
      str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
    return base64Encoded + padding;
  },
  base64tobase64URL(str) {
    return str.replace(/\+/gu, "-").replace(/\//gu, "_").replace(/[=]+$/u, "");
  },
  decodeData(str) {
    return LZString.decompressFromBase64(
      utils.base64URLTobase64(str.split("").reverse().join(""))
    );
  },
  encodeData(str) {
    return utils
      .base64tobase64URL(LZString.compressToBase64(str))
      .split("")
      .reverse()
      .join("");
  },
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  setCookie(cname, cvalue, days = 30) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${cname}=${cvalue}; path=/; ${expires}`;
  },
  getCookie(cname, defaultValue) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");
    for (let index = 0; index < cookies.length; index += 1) {
      let cookie = cookies[index];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return defaultValue;
  },
};

const app = createApp({
  data() {
    return {
      debug: true,
      debugData:
        'Welcome to the shop\n1\nmoney, coins, 10\n0\nmoney < 100\n<span class="button disabled"><i icon=sword></i> Buy the sword (100 <i icon=coins></i>)</span>\nmoney >= 100\n<a class=button href="?z=AElAU4Kwm6mGP5cFSBAmEo5sLBsoBrkTNxYFC2chDNywSDASyBqaOCYQBAE2SEsuWYF5iGW8DACMBQ-liQuFmh45jg4pyCAgxMA5XIDAwBAsBArAkJ7AAGtAgEzIBinEpJymDCGq5JGoQl5Ywh-aKREXAY4AAzWICANCcdboJmIhCDeJdAM7BAHUwS1Qcu8dZLASuTV0dRbAQOA1Jdp1TAGCQWAI4qFF8IYfPbWTBQmZdBAxcgajAYdFQSTAWCa6BoMB4EI5OwZAvA7A2DMG0EAWCMfAjwCwD"><i icon=sword></i> Buy the sword (100 <i icon=coins></i>)</span>\ntrue\n<a class=button href="?z=AQgAMoBcEHGhAANsEHAfVQrwbzs4w6cYkCJJdj-xYyfmwbEy1CJ85YDekGBtgRcsajLA0yBAQgJx70NAgxKAICApCzfQQjYt0iDGkCDMgxGAEHNYAOV84gJtSVQ0oGA0y2SpQjUryMdM80WSJhoUBDKAIEA04JS3BADC0BN_xyMAwjB0RGZ95ZiWJN5JlNdiohP6LAKBEgGNAkJWItACFkCAeAADH5QcBA2aeDwSZz6JoWPDyJ5FgYjBQgGBw0YAAWgJAMhuCYpJAhTAGBATgTPAcJdAeC4JZ5oZKwWg9AnBEAMHYHwSg1ghgsAfAjwCwD"><i icon=arrow-big-right></i> Go make some money</a>',
      debugUrl: "",
      editor: {
        numbersCols: 0,
        numbersText: "",
        overlayText: "",
      },
      parsed: DEFAULT_VALUES,
      shownData: [],
      env: {},
      header: "",
    };
  },
  computed: {},
  watch: {
    debugData(value) {
      this.readZData(value);
      if (this.debug) {
        this.updateEditor(value);
        this.updateDebugUrl(value);
        this.header = this.parsed.header;
        this.shownData = this.parsed.data;
      }
    },
  },
  beforeMount() {
    this.initApp();
  },
  mounted() {
    setTimeout(this.showApp);
    this.updateIcons();
  },
  updated() {
    this.updateIcons();
  },
  methods: {
    showApp() {
      document.getElementById("app").setAttribute("style", "");
    },
    initApp() {
      const url = new URL(window.location);
      let zdata = null;
      if (url.searchParams.get("z") !== null) {
        zdata = utils.decodeData(url.searchParams.get("z"));
        this.debug = this.readZData(zdata);
      }
      if (this.debug) {
        this.readZData(this.debugData);
        this.updateEditor(this.debugData);
        this.updateDebugUrl(this.debugData);
        this.header = this.parsed.header;
        this.shownData = this.parsed.data;
      } else {
        this.updateVars();
        this.updateShownData();
        this.header = this.insertVars(this.parsed.header);
        this.cleanZData(zdata);
      }
    },
    updateIcons() {
      lucide.createIcons({
        nameAttr: "icon",
        attrs: {
          width: "1.1em",
          height: "1.1em",
        },
      });
    },
    updateDebugUrl(value) {
      this.debugUrl = value.trim().length
        ? `${window.location.pathname}?z=${utils.encodeData(value.trim())}`
        : "";
    },
    updateEditor(value) {
      const debugDataSplit = value.split("\n");
      const headerSize =
        HELP_HEADER.length -
        (this.parsed.hasNamespace ? 0 : 1) -
        (this.parsed.hasColor ? 0 : 1);
      const varsSize =
        1 + (this.parsed.hasVars ? this.parsed.shownVars.length : 1);
      const changesSize =
        1 + (this.parsed.hasChanges ? this.parsed.changes.length : 1);
      let size = headerSize + varsSize + changesSize + HELP_PART_3.length;
      while (debugDataSplit.length > size) {
        size += HELP_PART_3.length;
      }
      const lines = Array(size).fill(0);
      this.editor.numbersText = debugDataSplit
        .map((_value, index) => `${index + 1}.`)
        .join("\n");
      this.editor.overlayText = lines
        .map((_value, index) => {
          if (
            debugDataSplit.length > index &&
            debugDataSplit[index].trim().length
          ) {
            return " ".repeat(debugDataSplit[index].length);
          }
          if (headerSize > index) {
            return HELP_HEADER[index];
          } else if (headerSize + varsSize > index) {
            return HELP_PART_1[Math.min(1, index - headerSize)];
          } else if (headerSize + varsSize + changesSize > index) {
            return HELP_PART_2[Math.min(1, index - headerSize - varsSize)];
          }
          return HELP_PART_3[
            (index - headerSize - varsSize - changesSize) % HELP_PART_3.length
          ];
        })
        .join("\n");
      this.editor.numbersCols =
        this.editor.numbersText.length.toString().length + 1;
    },
    editorScroll() {
      this.$refs.numbers.scrollTop = this.$refs.code.scrollTop;
      this.$refs.overlay.scrollTop = this.$refs.code.scrollTop;
      this.$refs.overlay.scrollLeft = this.$refs.code.scrollLeft;
    },
    readZData(str) {
      this.debugData = str;
      this.parsed = utils.clone(DEFAULT_VALUES);
      let parts = str.split("\n");
      if (!parts.length) {
        return true;
      }
      parts = this.parseHeader(parts);
      parts = this.parseVars(parts);
      parts = this.parseChanges(parts);
      parts = this.parseData(parts);
      return parts.length > 0;
    },
    parseHeader(parts) {
      this.parsed.header = parts.shift();
      if (!/<[^>]*>/u.test(this.parsed.header)) {
        this.parsed.header = `<h1>${this.parsed.header}</h1>`;
      }
      if (!parts.length) {
        return parts;
      }
      if (!/^\d+$/u.test(parts[0]) && parts[0].length) {
        this.parsed.namespace = parts.shift();
      } else {
        this.parsed.hasNamespace = parts[0].trim().length === 0;
      }
      if (!parts.length) {
        return parts;
      }
      if (!/^\d+$/u.test(parts[0]) && parts[0].length) {
        const rawPart = parts.shift().split(",");
        document
          .querySelector(":root")
          .style.setProperty("--hue-primary", (rawPart[0] ?? "180").trim());
        document
          .querySelector(":root")
          .style.setProperty("--sat-primary", (rawPart[1] ?? "30%").trim());
      } else {
        this.parsed.hasColor = parts[0].trim().length === 0;
      }
      return parts;
    },
    parseVars(parts) {
      if (!parts.length) {
        return parts;
      }
      this.parsed.hasVars = true;
      const rawCount = parts.shift();
      const varCount = /^\d+$/u.test(rawCount) ? parseInt(rawCount, 10) : 0;
      for (let index = 0; index < varCount; index += 1) {
        if (!parts.length) {
          return parts;
        }
        const rawPart = parts.shift().split(",");
        this.parsed.shownVars.push({
          name: (rawPart[0] ?? "var").trim(),
          icon: (rawPart[1] ?? "circle-help").trim(),
          default: (rawPart[2] ?? "0").trim(),
        });
      }
      return parts;
    },
    parseChanges(parts) {
      while (parts.length && !/^\d+$/u.test(parts[0])) {
        parts.shift();
      }
      if (!parts.length) {
        return parts;
      }
      this.parsed.hasChanges = true;
      const rawCount = parts.shift();
      const changeCount = /^\d+$/u.test(rawCount) ? parseInt(rawCount, 10) : 0;
      for (let index = 0; index < changeCount; index += 1) {
        if (!parts.length) {
          return parts;
        }
        const rawPart = parts.shift();
        const splitIndex = rawPart.indexOf("=");
        this.parsed.changes.push({
          name: (splitIndex >= 0
            ? rawPart.slice(0, splitIndex)
            : rawPart
          ).trim(),
          value: (splitIndex >= 0 ? rawPart.slice(splitIndex + 1) : "0").trim(),
        });
      }
      return parts;
    },
    parseData(parts) {
      while (parts.length >= 2) {
        this.parsed.data.push({
          condition: parts.shift(),
          data: parts.shift(),
        });
      }
      return parts;
    },
    readEnv() {
      let env = {};
      try {
        env = JSON.parse(utils.getCookie(this.parsed.namespace, "{}"));
      } catch {
        env = {};
      }
      this.parsed.shownVars.forEach((item) => {
        if (!Object.hasOwn(env, item.name)) {
          try {
            env[item.name] = eval(item.default);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(item.default, error);
            env[item.name] = null;
          }
        }
      });
      return env;
    },
    saveEnv(env) {
      utils.setCookie(this.parsed.namespace, JSON.stringify(env));
    },
    updateVars() {
      this.env = this.readEnv();
      Object.keys(this.env).forEach((key) => {
        window[key] = this.env[key];
      });
      this.parsed.changes.forEach((item) => {
        try {
          this.env[item.name] = eval(item.value);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(item.value, error);
          this.env[item.name] = null;
        }
        window[item.name] = this.env[item.name];
      });
      this.saveEnv(this.env);
    },
    updateShownData() {
      this.shownData = this.parsed.data
        .filter((item) => {
          try {
            return Boolean(eval(item.condition));
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(item.condition, error);
            return false;
          }
        })
        .map((item) => ({
          condition: item.condition,
          data: this.insertVars(item.data),
        }));
    },
    insertVars(value) {
      let newValue = value;
      [...value.matchAll(/\{\{(?<expr>[^}]+)\}\}/gu)].forEach((match) => {
        const [fullMatch, expression] = match;
        const parsedExpression = expression
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&amp;", "&");
        try {
          const result = eval(parsedExpression);
          newValue = newValue.replaceAll(fullMatch, result);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(parsedExpression, error);
          newValue = newValue.replaceAll(fullMatch, "");
        }
      });
      return newValue;
    },
    cleanZData(str) {
      const headerSize =
        HELP_HEADER.length -
        (this.parsed.hasNamespace ? 0 : 1) -
        (this.parsed.hasColor ? 0 : 1);
      const varsSize =
        1 + (this.parsed.hasVars ? this.parsed.shownVars.length : 1);
      const changesSize =
        1 + (this.parsed.hasChanges ? this.parsed.changes.length : 1);
      const parts = str.split("\n");
      parts.splice(headerSize + varsSize, changesSize, "0");
      window.history.replaceState(
        "",
        "",
        `${window.location.pathname}?z=${utils.encodeData(
          parts.join("\n").trim()
        )}`
      );
    },
    icon(name) {
      return `<i icon=${name}></i>`;
    },
  },
});

window.onload = () => {
  app.mount("#app");
};
