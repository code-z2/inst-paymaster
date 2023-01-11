export const schema = {
    type: "object",
    required: [
        "name",
        "user_address",
        "contract_address",
        "metadata",
        "approved",
        "created_at",
    ],
    properties: {
        name: {
            type: "string",
        },
        user_address: {
            type: "string",
        },
        contract_address: {
            type: "string",
        },
        metadata: {
            type: "string",
        },
        approved: {
            type: "boolean",
        },
        created_at: {
            type: "number",
        },
        // optionals

        updated_at: {
            type: "number",
        },
        audited: {
            type: "boolean",
        },
    },
}
