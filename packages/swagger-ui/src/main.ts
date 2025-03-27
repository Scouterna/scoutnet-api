import SwaggerUI from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";

import documentUrl from "@scouterna/scoutnet-openapi/scoutnet.yaml?url";

SwaggerUI({
  dom_id: "#app",
  url: documentUrl,
});
