import SwaggerParser from "@apidevtools/swagger-parser";
import fs from "fs";

export default function openApiPlugin() {
    return {
        async generateBundle() {
            const openapiSpec = await SwaggerParser.bundle("./src/assets/openapi.yaml", {
                dereference: {
                    circular: "ignore",
                }
            });
            fs.writeFileSync("./src/assets/openapiSpecification.ts", `export default ${JSON.stringify(openapiSpec, null, 2)}`);
        }
    };
}