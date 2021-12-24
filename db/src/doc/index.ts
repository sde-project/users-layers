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
            url: "http://localhost:8001/",
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

            DeviceInput: {
                type: "object",
                properties: {
                    user: {
                        type: "string",
                    },
                    token: {
                        type: "string",
                    },
                    created: {
                        type: "string",
                    },
                    last_used: {
                        type: "string",
                    }
                }
            },

            DeviceOutput: {
                type: "object",
                properties: {
                    _id: {
                        type: "string",
                    },
                    user: {
                        type: "string",
                    },
                    token: {
                        type: "string",
                    },
                    created: {
                        type: "string",
                    },
                    last_used: {
                        type: "string",
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

            ProfileObject: {
                type: "object",
                properties: {
                    _id: {
                        type: "string",
                    },
                    user: {
                        type: "string",
                    },
                    username: {
                        type: "string",
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

            ProfileCreation: {
                type: "object",
                properties: {
                    user: {
                        type: "string",
                    },
                    username: {
                        type: "string",
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

            ProfileInput: {
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
        }
    },
    paths: {
        ...auth,
        ...profile,
        ...device
    }
};