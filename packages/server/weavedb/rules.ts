export const rules = (adminAddress: string) => {
    return {
        let: {
            id: [
                "join",
                ":",
                [
                    {var: "resource.newData.user_address"},
                    {var: "resource.newData.contract_address"},
                ],
            ],
        },
        "allow create": {
            and: [
                {
                    "==": [
                        {var: "request.auth.signer"},
                        {var: "resource.newData.user_address"},
                    ],
                },
                {
                    "==": [{var: "resource.id"}, {var: "id"}],
                },
                {
                    "==": [
                        {var: "request.block.timestamp"},
                        {var: "resource.newData.created_at"},
                    ],
                },
                {
                    "==": [
                        {var: "request.block.timestamp"},
                        {var: "resource.newData.updated_at"},
                    ],
                },
                {
                    "==": [{var: "resource.newData.approved"}, false],
                },
            ],
        },
        "allow update": {
            "==": [{var: "request.auth.signer"}, adminAddress],
        },
        "allow delete": {
            "==": [{var: "request.auth.signer"}, adminAddress],
        },
    }
}
