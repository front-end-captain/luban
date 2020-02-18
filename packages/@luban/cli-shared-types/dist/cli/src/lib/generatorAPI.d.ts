import { Options as EJSOptions } from "ejs";
import { Generator } from "./generator";
import { BasePkgFields, RootOptions } from "../definitions";
import { ExecaChildProcess } from "execa";
declare class GeneratorAPI {
  private readonly id;
  private readonly generator;
  private readonly options;
  private readonly rootOptions;
  private readonly pluginsData;
  private _entryFile;
  constructor(
    id: string,
    generator: Generator,
    options: Record<string, any>,
    rootOptions: RootOptions,
  );
  private _resolveData;
  private _injectFileMiddleware;
  resolve(_path: string): string;
  get cliVersion(): string;
  hasPlugin(id: string, version: string): boolean;
  extendPackage(
    fields: Partial<BasePkgFields> | ((pbk: Partial<BasePkgFields>) => Partial<BasePkgFields>),
    forceNewVersion?: boolean,
  ): void;
  render(source: any, additionalData?: Record<string, any>, ejsOptions?: EJSOptions): void;
  postProcessFiles(cb: () => void): void;
  addExitLog(msg: string, type?: string): void;
  static makeJSOnlyValue(str: string): () => void;
  get entryFile(): string;
  hasNoAnyFeatures(): boolean;
  useTsWithBabel(): boolean;
  run(command: string, args?: any): ExecaChildProcess;
  isGitRepository(): boolean;
}
export { GeneratorAPI };
