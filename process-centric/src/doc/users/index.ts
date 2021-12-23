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
                                $ref: "#/components/schemas/UserOutput",
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
    },
    '/users/id/{id}/following': {
        get: {
            tags: ["Users"],
            description: "Get the users that the user is following",
            security: [
                {
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
                    description: "The list of users",
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
            description: "Add a user to the list of users that the user is following",
            security: [
                {
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
                            type: "object",
                            properties: {
                                id: {
                                    type: "string",
                                }
                            }
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Operation succesful",
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
    },
    '/users/id/{id}/following/{following}': {
        delete: {
            tags: ["Users"],
            description: "Remove a user from the list of users that the user is following",
            security: [
                {
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
                },
                {
                    name: "following",
                    in: "path",
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Operation succesful",
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
    '/users/id/{id}/followers': {
        get: {
            tags: ["Users"],
            description: "Get the users that the user is following",
            security: [
                {
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
                    description: "The list of users",
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
    '/users/username/{username}': {
        get: {
            tags: ["Users"],
            description: "Checks if the username is available",
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
                    description: "whether the username is available",
                    content: {
                        "application/json": {
                            schema: {
                                type: "boolean",
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
    '/users/email/{email}': {
        get: {
            tags: ["Users"],
            description: "Checks if the email is available",
            parameters: [
                {
                    name: "email",
                    in: "path",
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                200: {
                    description: "whether the email is available",
                    content: {
                        "application/json": {
                            schema: {
                                type: "boolean",
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
    }
}