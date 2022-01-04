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
    "/users/register": {
        post: {
            tags: ["Users"],
            description: "Register a user",
            parameters: [],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/RegisterInput",
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Register was successfull",
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
    },
    '/users/google/oauth': {
        get: {
            tags: ["Users"],
            description: "Gets the url to redirect the user to the google oauth page",
            parameters: [
                {
                    name: "redirect_uri",
                    in: "query",
                    schema: {
                        type: "string",
                        required: true
                    }
                }
            ],
            responses: {
                200: {
                    description: "The url to redirect the user to the google oauth page",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    url: {
                                        type: "string",
                                    },
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
    '/users/google/callback': {
        get: {
            tags: ["Users"],
            description: "Callback called by the google oauth page",
            parameters: [
                {
                    name: "code",
                    in: "query",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "scope",
                    in: "query",
                    schema: {
                        type: "string"
                    },
                },
                {
                    name: "authuser",
                    in: "query",
                    schema: {
                        type: "number",
                    },
                },
                {
                    name: "prompt",
                    in: "query",
                    schema: {
                        type: "string",
                    }
                },
                {
                    name: "redirect_uri",
                    in: "query",
                    schema: {
                        type: "string",
                        required: true
                    }
                }
            ],
            responses: {
                200: {
                    description: "The token to use to authenticate the user",
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
        "/users/devices/token": {
            post: {
                tags: ["Users"],
                description: "Associate a token to a user.",
                parameters: [],
                security: [
                    {
                        token: [],
                    }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    token: {
                                        type: "string",
                                        description: "The token to be associated to the logged user.",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Association successful.",
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
    }
}