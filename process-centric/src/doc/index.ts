import { default as users } from "./users/index";

export default {
    openapi: "3.0.3",
    info: {
        title: "Process centric layer",
        description: "User's Process centric layer for CryptoDashboard",
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

            RegisterInput: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
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
        ...users
    }
};