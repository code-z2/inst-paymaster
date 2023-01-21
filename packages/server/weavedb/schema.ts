export const schema = {
    type: "object",
    required: [
        "name",
        "user_address",
        "contract_address",
        "metadata",
        "approved",
        "created_at",
        "updated_at",
        "audited",
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
        updated_at: {
            type: "number",
        },
        audited: {
            type: "boolean",
        },
    },
};
