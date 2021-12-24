export default {
    "/devices": {
        post: {
            tags: ["Devices"],
            description: "Insert a new device token",
            parameters: [],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/DeviceInput",
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Token inserted succesfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/DeviceOutput",
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
            },
        }
    },
    "/devices/all": {
        get: {
            tags: ["Devices"],
            description: "Get all devices",
            responses: {
                200: {
                    description: "The list of devices",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/DeviceOutput",
                                }
                            },
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
            },
        }
    },
    "/devices/user/{user}": {
        get: {
            tags: ["Devices"],
            description: "Get tokens for a user",
            parameters: [
                {
                    name: "user",
                    in: "path",
                    description: "User id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "The devices for the user",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/DeviceOutput",
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
            },
        },
    },
    "/devices/token/{token}": {
        get: {
            tags: ["Devices"],
            description: "Get the user that is owning the token",
            parameters: [
                {
                    name: "token",
                    in: "path",
                    description: "token",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "The user id that is owning the token",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/DeviceOutput",
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
                404: {
                    description: "Token not found",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                }
            },
        },
    },
    "/devices/id/{id}": {
        get: {
            tags: ["Devices"],
            description: "Get a device object",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "The object",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/DeviceOutput",
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
                404: {
                    description: "Token not found",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                }
            },
        },
        put: {
            tags: ["Devices"],
            description: "Adeit a device object",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/DeviceInput",
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "The updated object",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/DeviceOutput",
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
                404: {
                    description: "Token not found",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                }
            },
        },
        delete: {
            tags: ["Devices"],
            description: "Delete a device object",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                }
            ],
            responses: {
                200: {
                    description: "Object deleted succesfully",
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
                404: {
                    description: "Not found",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GeneralError"
                            }
                        }
                    }
                }
            },
        }
    }
}