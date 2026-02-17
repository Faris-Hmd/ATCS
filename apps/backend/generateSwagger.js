const fs = require("fs");
const swaggerSpec = require("./config/swagger");

try {
  fs.writeFileSync("swagger.json", JSON.stringify(swaggerSpec, null, 2));
  console.log("Swagger JSON generated successfully: swagger.json");
} catch (err) {
  console.error("Error generating swagger.json:", err);
}
