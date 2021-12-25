export default {
    "/devices/token": {
        post: {
            tags: ["Devices"],
            description: "Associate a token to a user.",
            parameters: [],
            security: [
                {
                    api_key: [],
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
    "/devices/notifications": {
        post: {
            tags: ["Devices"],
            description: "Send a notification to a group of users.",
            parameters: [],
            security: [
                {
                    api_key: [],
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Notification",
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Notification sent successfully.",
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