export default {
    status: {
        creating: false
    },
    
    selection: {
        _id: null,
        content: {
            name: "",
            folder: "",
            flow: []
        }
    },
    edition: {
        // Minimaal parameters guaranteed to exist
        name: "",
        folder: "",
        flow: [
            {
                type: ""
            }
        ]
    },
    experimentsReferences: [
        {
            _id: "",
            name: "",
            folder: ""
        }
    ]

} 
