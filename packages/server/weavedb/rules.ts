export const rules = (admin_address: string) => ({
    "allow create": {
        and: [
            {
                "==": [{var: "request.auth.signer"}, {var: "resource.newData.user_address"}],
            },
            {
                "==": [{var: "request.block.timestamp"}, {var: "resource.newData.created_at"}],
            },
            {
                "==": [{var: "request.block.timestamp"}, {var: "resource.newData.updated_at"}],
            },
            {
                "==": [{var: "resource.newData.approved"}, false],
            },
        ],
    },
    "allow update": {
        and: [{"==": [{var: "request.auth.signer"}, admin_address]}],
    },
    "allow delete": {
        and: [{"==": [{var: "request.auth.signer"}, admin_address]}],
    },
});
