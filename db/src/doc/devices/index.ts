export default {
    "/devices": {
        post: {
            tags: ["Devices"],
            description: "Create auth object",
            parameters: [],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/AuthInput", // todo input data model
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
            },
        },
    },
    // '/users/all': {
    //     get: {
    //         tags: ["Users"],
    //         description: "Get all auth objects",
    //         responses: {
    //             200: {
    //                 description: "The auth objects",
    //                 content: {
    //                     "application/json": {
    //                         schema: {
    //                             type: "array",
    //                             items: {
    //                                 $ref: "#/components/schemas/AuthObject"
    //                             }
    //                         }
    //                     }
    //                 }
    //             },
    //             400: {
    //                 description: "Parameters error",
    //                 content: {
    //                     "application/json": {
    //                         schema: {
    //                             $ref: "#/components/schemas/GeneralError"
    //                         }
    //                     }
    //                 }
    //             },
    //         },
    //     },
    // },
    // '/users/id/{id}': {
    //     get: {
    //         tags: ["Users"],
    //         description: "Get an auth object from its id",
    //         parameters: [
    //             {
    //                 name: "id",
    //                 in: "path",
    //                 schema: {
    //                     type: "string"
    //                 }
    //             }
    //         ],
    //         responses: {
    //             200: {
    //                 description: "The auth object",
    //                 content: {
    //                     "application/json": {
    //                         schema: {
    //                             $ref: "#/components/schemas/AuthObject"
    //                         }
    //                     }
    //                 }
    //             },
    //             400: {
    //                 description: "Parameters error",
    //                 content: {
    //                     "application/json": {
    //                         schema: {
    //                             $ref: "#/components/schemas/GeneralError"
    //                         }
    //                     }
    //                 }
    //             },
    //         },
    //     },
    //     put: {
    //         tags: ["Users"],
    //         description: "Edit password (and salt)",
    //         parameters: [
    //             {
    //                 name: "id",
    //                 in: "path",
    //                 schema: {
    //                     type: "string"
    //                 }
    //             }
    //         ],
    //         requestBody: {
    //             content: {
    //                 "application/json": {
    //                     schema: {
    //                         $ref: "#/components/schemas/AuthPutInput", // todo input data model
    //                     },
    //                 },
    //             },
    //         },
    //         responses: {
    //             200: {
    //                 description: "Auth object modified succesfully",
    //                 content: {
    //                     "application/json": {
    //                         schema: {
    //                             $ref: "#/components/schemas/AuthObject"
    //                         }
    //                     }
    //                 }
    //             },
    //             400: {
    //                 description: "Parameters error",
    //                 content: {
    //                     "application/json": {
    //                         schema: {
    //                             $ref: "#/components/schemas/GeneralError"
    //                         }
    //                     }
    //                 }
    //             },
    //         },
    //     },
    //     delete: {
    //         tags: ["Users"],
    //         description: "Delete an auth object",
    //         parameters: [
    //             {
    //                 name: "id",
    //                 in: "path",
    //                 schema: {
    //                     type: "string"
    //                 }
    //             }
    //         ],
    //         responses: {
    //             200: {
    //                 description: "Auth object deleted succesfully",
    //             },
    //             400: {
    //                 description: "Parameters error",
    //                 content: {
    //                     "application/json": {
    //                         schema: {
    //                             $ref: "#/components/schemas/GeneralError"
    //                         }
    //                     }
    //                 }
    //             },
    //         },
    //     },
    // },
    // '/users/email/{email}': {
    //     get: {
    //         tags: ["Users"],
    //         description: "Get an auth object from its email",
    //         parameters: [
    //             {
    //                 name: "email",
    //                 in: "path",
    //                 schema: {
    //                     type: "string"
    //                 }
    //             }
    //         ],
    //         responses: {
    //             200: {
    //                 description: "The auth object",
    //                 content: {
    //                     "application/json": {
    //                         schema: {
    //                             $ref: "#/components/schemas/AuthObject"
    //                         }
    //                     }
    //                 }
    //             },
    //             400: {
    //                 description: "Parameters error",
    //                 content: {
    //                     "application/json": {
    //                         schema: {
    //                             $ref: "#/components/schemas/GeneralError"
    //                         }
    //                     }
    //                 }
    //             },
    //         },
    //     },
    // }
}