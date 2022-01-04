module.exports = {
    getTitle,
};

/**
 * Returns the title of the curriculum
 * @param  {Object} progression 
 * @return {Date}  The date where the progression was started
 *                      
*/
function getTitle(curriculum) {
    return (curriculum) ? curriculum.title : "";
}
