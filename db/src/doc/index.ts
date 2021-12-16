import { default as auth } from "./auth/index";
import { default as device } from "./devices/index";
import { default as profile } from "./profile/index";

export default {
    openapi: "3.0.3",
    info: {
        title: "DB data layer",
        description: "DB data layer for CryptoDashboard",
        version: "1.0.0",
        contact: {
            name: "Carlo Ramponi",
            email: "carlo@drenlab.com",
            url: "drenlab.com",
        },
    },
    servers: [
        {
            url: "http://localhost:8000/",
            description: "Local server",
        }
    ],
    security: [
        {
            api_key: []
        }
    ],
    components: {
        schemas: {

            GeneralError: {
                type: "object",
                properties: {
                    statusCode: {
                        type: "number"
                    },
                    message: {
                        type: "string"
                    }
                }
            },

            AuthInput: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                    },
                    account_type: {
                        type: "string",
                        enum: ["email", "google"]
                    },
                    password: {
                        type: "string"
                    },
                    salt: {
                        type: "string"
                    }
                }
            },

            AuthPutInput: {
                type: "object",
                properties: {
                    password: {
                        type: "string"
                    },
                    salt: {
                        type: "string"
                    }
                }
            },

            AuthObject: {
                type: "object",
                properties: {
                    _id: {
                        type: "string",
                    },
                    email: {
                        type: "string"
                    },
                    account_type: {
                        type: "string",
                        enum: ["email", "google"]
                    },
                    password: {
                        type: "string"
                    },
                    salt: {
                        type: "string"
                    }
                }
            },
        },

        responses: {
            NotFound: {
                description: "Entity not found.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GeneralError"
                        }
                    }
                }
            },
            IllegalInput: {
                description: "Illegal input for operation.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GeneralError"
                        }
                    }
                }
            },
            Unauthorized: {
                description: "Request was not authorized.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GeneralError"
                        }
                    }
                }
            },
            GeneralError: {
                description: "General Error",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GeneralError"
                        }
                    }
                }
            }
        },

        securitySchemes: {
            api_key: {
                type: "apiKey",
                name: "Authorization",
                in: "header"
            },
        }
    },
    paths: {
        ...auth,
        ...profile,
        ...device
    }
};