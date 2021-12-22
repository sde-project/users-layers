export default {
    "/users/login": {
        post: {
            tags: ["Users"],
            description: "Login a user",
            parameters: [],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/LoginInput",
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Login was successfull",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/LoginOutput",
                            }
                        }
                    }
                },
                400: {
                    description: "Parameters error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
                500: {
                    description: "General Error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
            },
        },
    },
    "/users": {
        post: {
            tags: ["Users"],
            description: "Create user",
            parameters: [],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UserInput",
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "User created succesfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UserOutput"
                            }
                        }
                    }
                },
                400: {
                    description: "Parameters error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
                401: {
                    description: "Unauthorized",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
                500: {
                    description: "General Error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
            },
        },
    },
    '/users/fromUsername/{username}': {
        get: {
            tags: ["Users"],
            description: "Get users from (part of) username",
            security: [
                {
                    api_key: [],
                    token: [],
                }
            ],
            parameters: [
                {
                    name: "username",
                    in: "path",
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                200: {
                    description: "The users",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/UserOutput"
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Parameters error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
                401: {
                    description: "Unauthorized",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
                500: {
                    description: "General Error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
            },
        },
    },
    '/users/fromCrypto/{crypto}': {
        get: {
            tags: ["Users"],
            description: "Get users that follow a particular crypto",
            security: [
                {
                    api_key: [],
                    token: [],
                }
            ],
            parameters: [
                {
                    name: "crypto",
                    in: "path",
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                200: {
                    description: "The users",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/UserOutput"
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Parameters error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
                401: {
                    description: "Unauthorized",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
                500: {
                    description: "General Error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
            },
        },
    },
    '/users/id/{id}': {
        get: {
            tags: ["Users"],
            description: "Get a user from its id",
            security: [
                {
                    api_key: [],
                    token: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                200: {
                    description: "The user",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UserOutput"
                            }
                        }
                    }
                },
                400: {
                    description: "Parameters error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
                401: {
                    description: "Unauthorized",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
                404: {
                    description: "Not found",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
                500: {
                    description: "General Error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
            },
        },
        put: {
            tags: ["Users"],
            description: "Edit user data",
            security: [
                {
                    api_key: [],
                    token: [],
                }
            ],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    schema: {
                        type: "string"
                    }
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/EditUserInput",
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "User edited succesfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AuthObject"
                            }
                        }
                    }
                },
                400: {
                    description: "Parameters error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
                401: {
                    description: "Unauthorized",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
                404: {
                    description: "Not found",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
                500: {
                    description: "General Error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
            },
        },
    },
    '/users/me': {
        get: {
            tags: ["Users"],
            description: "Get data about the logged user",
            security: [
                {
                    api_key: [],
                    token: [],
                }
            ],
            responses: {
                200: {
                    description: "The user",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UserOutput"
                            }
                        }
                    }
                },
                401: {
                    description: "Unauthorized",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
                500: {
                    description: "General Error",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                },
            },
        },
    }
    //TODO: FOLLOWS API CALLS
}