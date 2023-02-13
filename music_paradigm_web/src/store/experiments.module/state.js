import { defaultState } from '@/store-helper/experiments.module-helper';

export default {
	status: {
		isFetchingExperimentHeadersList: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false,
		hasCompiledEdition: false,
		isDownloadingTasksZipFile: false,
	},
	edition: defaultState.DEFAULT_MINIMAL_EXPERIMENT(),
	selection: defaultState.DEFAULT_EMPTY_SELECTION(),
	experimentsHeadersList: defaultState.EMPTY_EXPERIMENTS_HEADERS_LIST(),
	imposedParameterValues: defaultState.DEFAULT_IMPOSED_PARAMETERS(),
	logType: defaultState.DEFAULT_LOG_TYPE(),
	imposedTags: defaultState.DEFAULT_IMPOSED_TAGS(),
};
