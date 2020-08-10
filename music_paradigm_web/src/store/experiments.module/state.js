import { validator } from "@/_helpers";

export default {
    status: {
        isCreating: false,
        hasCompiledEdition: false,
        isExperimentSelected: false
    },

    selection: {
        _id: null,
        content: validator.getMinimalValidExperimentStructure()
    },
    edition: validator.getMinimalValidExperimentStructure(),
    experimentsReferences: [
        {
            _id: "",
            name: "",
            folder: ""
        }
    ]
} 
