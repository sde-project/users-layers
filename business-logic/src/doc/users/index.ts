export default {
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
        delete: {
            tags: ["Users"],
            description: "Delete a user",
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
                    description: "User deleted succesfully",
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
    //TODO: FOLLOWS API CALLS
}