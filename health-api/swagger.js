const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Health Api",
    description: "API for managing medicines and ailments",
  },
  host: "localhost:8080",
  basePath: '/'
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
