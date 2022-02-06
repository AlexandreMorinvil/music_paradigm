import { log } from '@/_helpers';

export default {
	EMPTY_SESSION_INFORMATION,
};

function EMPTY_SESSION_INFORMATION() {
	const randomUniqueId = String(new Date().valueOf());
	return {
		associativeId: randomUniqueId,
		logType: log.defaultLogType,
		tags: [],
	};
}
