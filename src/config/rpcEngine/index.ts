import { IRpcEngine } from "src/helpers/types";
import { IAppState } from "src/App";

class RpcEngine implements IRpcEngine {
  public engines: IRpcEngine[];
  constructor(engines: IRpcEngine[]) {
    this.engines = engines;
  }

  public filter(payload: any) {
    const engine = this.getEngine(payload);
    return engine.filter(payload);
  }

  public router(payload: any, state: IAppState, setState: any) {
    const engine = this.getEngine(payload);
    return engine.router(payload, state, setState);
  }

  public render(payload: any) {
    const engine = this.getEngine(payload);
    return engine.render(payload);
  }

  public signer(payload: any, state: IAppState, setState: any) {
    const engine = this.getEngine(payload);
    return engine.signer(payload, state, setState);
  }

  private getEngine(payload: any) {
    const match = this.engines.filter(engine => engine.filter(payload));
    if (!match || !match.length) {
      throw new Error(`No RPC Engine found to handle payload with method ${payload.method}`);
    }
    return match[0];
  }
}

export default RpcEngine;
