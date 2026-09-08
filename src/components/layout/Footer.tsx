import { appConfig } from "../../config/app";

export function Footer() {
  return (
    <footer className="site-footer">
      <span>
        {appConfig.name} v{appConfig.version}
      </span>
      <a href={appConfig.repoUrl} target="_blank" rel="noreferrer">
        Public repository
      </a>
    </footer>
  );
}
