// The default state must be imported with the default export (from the file directly) instead of the named export
// (from the index file) the named import does not happen early enough. We need the contant of the file available
// immediately. (Trying to import the default state with a named import would cause an error as it would still be
// undefined when trying to call a function from it)
import defaultState from '@/store-helper/experiment.module-helper/default-state';

export default defaultState.DEFAULT_EXPERIMENT_STATE_VALUES();
