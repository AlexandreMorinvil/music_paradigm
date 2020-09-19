export default {
    status: {
        isFetchingUsersHeadersList: false,
        isCreating: false,
        isUpdating: false,
        isDeleting: false
    },

    selection: {
        _id: null,
        // The Rest of the parameters are also included
        username: "",
        email: "",
        role: "",
        tags: [],
        firstName: "",
        middleName: "",
        lastName: ""
    },

    usersHeadersList: [
        {
            _id: "",
            username: "",
            email: "",
            role: "",
            tags: [],
            firstName: "",
            middleName: "",
            lastName: "",

            // Summary of the tasks generated by the backend
            tasks:
                [
                    {
                        title: "",
                        totalExperiments: 0,
                        completedExperiments: 0,
                        unfinishedExperiment: false
                    }
                ]
        }
    ]
} 
