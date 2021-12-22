export default {
    "/profiles": {
        post: {
            tags: ["Profiles"],
            description: "Create auth object",
            parameters: [],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ProfileCreation",
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Auth object created succesfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ProfileObject"
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
    '/profiles/all': {
        get: {
            tags: ["Profiles"],
            description: "Get all profiles",
            responses: {
                200: {
                    description: "The profiles",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/ProfileObject"
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
    '/profiles/id/{id}': {
        get: {
            tags: ["Profiles"],
            description: "Get a profile from its id",
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
                    description: "The profile",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ProfileObject"
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
            tags: ["Profiles"],
            description: "Edit profile",
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
                            $ref: "#/components/schemas/ProfileInput",
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Auth object modified succesfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ProfileObject"
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
            tags: ["Profiles"],
            description: "Delete a profile",
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
                    description: "Profile deleted succesfully",
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
    '/profiles/username/{username}': {
        get: {
            tags: ["Profiles"],
            description: "Get profiles from (part of) his username",
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
                    description: "The profiles",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/ProfileObject"
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
    '/profiles/userid/{id}': {
        get: {
            tags: ["Profiles"],
            description: "Get profiles from its user id",
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
                    description: "The profile",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ProfileObject"
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
    '/profiles/crypto/{crypto}': {
        get: {
            tags: ["Profiles"],
            description: "Get profiles from his crypto",
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
                    description: "The profiles",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/ProfileObject"
                                },
                            },
                        },
                    },
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
            }
        },
    }
}