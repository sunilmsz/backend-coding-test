const swaggerJsdoc = require("swagger-jsdoc");

const getSpecifications = (paths) => {
   
    const serverUrl = "http://localhost:8010/"
    const options = {
        failOnErrors: true,
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Backend Coding Test Doc",
                version: "1.0.0",
            },
            servers: [
                {
                    url: serverUrl,
                    description: "Backend Coding API ",
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuthToken: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
            },
        },
        apis: [...paths],
    };
    const openapiSpecification = swaggerJsdoc(options); // openApi creation from yaml or json code
    
    return openapiSpecification;
}


module.exports = { getSpecifications }

