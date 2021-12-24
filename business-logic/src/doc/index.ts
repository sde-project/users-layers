import devices from "./devices";
import auth from "./users";

export default {
    openapi: "3.0.3",
    info: {
        title: "Business logic layer",
        description: "User's Business logic for CryptoDashboard",
        version: "1.0.0",
        contact: {
            name: "Carlo Ramponi",
            email: "carlo@drenlab.com",
            url: "drenlab.com",
        },
    },
    servers: [
        {
            url: "http://localhost:8002/",
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

            UserInput: {
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
                    username: {
                        type: "string"
                    }
                }
            },

            UserOutput: {
                type: "object",
                properties: {
                    _id: {
                        type: "string"
                    },
                    username: {
                        type: "string"
                    },
                    name: {
                        type: "string",
                    },
                    bio: {
                        type: "string",
                    },
                    links: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                website: {
                                    type: "string",
                                },
                                text: {
                                    type: "string",
                                }
                            }
                        }
                    },
                    cryptos: {
                        type: "array",
                        items: {
                            type: "string",
                        }
                    },
                    following: {
                        type: "array",
                        items: {
                            type: "string",
                        }
                    },
                    public: {
                        type: "boolean",
                    },
                }
            },

            EditUserInput: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                    },
                    bio: {
                        type: "string",
                    },
                    links: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                website: {
                                    type: "string",
                                },
                                text: {
                                    type: "string",
                                }
                            }
                        }
                    },
                    cryptos: {
                        type: "array",
                        items: {
                            type: "string",
                        }
                    },
                    following: {
                        type: "array",
                        items: {
                            type: "string",
                        }
                    },
                    public: {
                        type: "boolean",
                    },
                }
            },

            LoginInput: {
                type: "object",
                properties: {
                    email: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    }
                }
            },

            LoginOutput: {
                type: "object",
                properties: {
                    token: {
                        type: "string"
                    }
                }
            }

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
                name: "api-key",
                in: "header"
            },
            token: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                name: "Authorization",
                in: "header"
            }
        }
    },
    paths: {
        ...auth,
        ...devices
    }
};