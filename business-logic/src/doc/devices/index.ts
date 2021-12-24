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
}