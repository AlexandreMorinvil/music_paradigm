// Getters are used when another model gets information from another model.
// Having accessor functions defined directily in the model's folder makes it much easier to trace
// the acesses to different attributes of the given model in case of a change to the schema.

module.exports = {
    getTitle,
};

/**
 * Returns the title of the curriculum
 * @param  {Object} curriculumDocument 
 * @return {Date}  The date where the progression was started
 *                      
*/
function getTitle(curriculumDocument) {
    return (curriculumDocument) ? curriculumDocument.title : "";
}
