import { CSSProperties } from "react";

export default class Statics {
  public static GridWidth = (drawerStatus: boolean): CSSProperties => {
    return drawerStatus
      ? { marginLeft: "calc(17rem + 64px)", marginRight: "2rem", width: "calc(100% - 19rem - 64px)" }
      : { marginLeft: "2rem", marginRight: "2rem", width: "calc(100% - 4rem)" };
  };
}
