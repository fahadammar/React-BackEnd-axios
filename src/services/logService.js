import Raven from "raven-js";

function init() {
  Raven.config(
    "https://898ca024cfb74b358e9ab5c709de7328@o436938.ingest.sentry.io/5398765",
    {
      release: "1-0-0",
      environment: "development-test",
    }
  ).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log,
};
