import { RootOptions, Preset } from "./definitions";

export const defaultPreset: Required<Preset> = {
  language: "ts",
  eslint: "airbnb",
  cssPreprocessor: "less",
  stylelint: true,
  router: true,
  store: true,
  unitTest: true,
  plugins: {
    "@luban-cli/cli-plugin-service": {},
    "@luban-cli/cli-plugin-babel": {},
    "@luban-cli/cli-plugin-eslint": {},
    "@luban-cli/cli-plugin-router": {},
    "@luban-cli/cli-plugin-store": {},
    "@luban-cli/cli-plugin-stylelint": {},
    "@luban-cli/cli-plugin-typescript": {},
    "@luban-cli/cli-plugin-unit-test": {},
  },
};

export const defaultPresetNameMap: Record<keyof Omit<Preset, "plugins">, string> = {
  language: "development language",
  eslint: "eslint config",
  cssPreprocessor: "css pre-processor",
  stylelint: "use stylelint",
  router: "use router(based on React-Router)",
  store: "use centralized store(based ont rematch)",
  unitTest: "use unit test(based ont jest + enzyme)",
};

// TODO add prompt module apiRequest
export const defaultPromptModule: Array<keyof Preset> = [
  "language",
  "eslint",
  "cssPreprocessor",
  "stylelint",
  "router",
  "store",
  // "unitTest",
];

export const defaultRootOptions: Required<RootOptions> = {
  projectName: "",
  preset: defaultPreset,
};

export const confirmUseDefaultPresetMsg =
  "Will use default preset create project? \n" +
  "  (if you want to specify custom features with project, " +
  "cancel current operation and use `luban init <project_directory> -m` to create project)";
