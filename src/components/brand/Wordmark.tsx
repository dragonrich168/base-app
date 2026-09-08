import { APP_NAME } from "../../constants/copy";
import { Logo } from "./Logo";

export function Wordmark() {
  return (
    <span className="wordmark">
      <Logo />
      <span className="wordmark-rest">{APP_NAME.replace("Base", "").trim() || "App"}</span>
    </span>
  );
}
