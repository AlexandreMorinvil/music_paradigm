const CurriculumModel = require('database/models/curriculum/curriculum.model');


// TODO : Delete conversions (the concept seems to not work very well)
async function convertCurriculumSchema() {

    // Correction : Change the field name "experiments.[].isUniqueIndDay" 
    //              to "experiments.[].hasToWaitNextDayAfterCompletion"
    // await CurriculumModel.update({},
    //     [
    //         {
    //             $set: {
    //                 "experiments": {
    //                     $map: {
    //                         input: "$experiments",
    //                         in: {
    //                             $mergeObjects: [
    //                                 "$$this",
    //                                 {
    //                                     isUniqueInDay: "$$this.isUniqueIndDay"
    //                                 }
    //                             ]
    //                         }
    //                     }
    //                 }
    //             }
    //         },
    //         {
    //             $unset: "experiments.isUniqueIndDay",
    //         }
    //     ],
    //     {
    //         multi: true,
    //     })
}

module.exports = convertCurriculumSchema;