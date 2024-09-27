

export class PreloaderResourcesSlidingWindow {
    constructor() {
        this.windowSize = 10;
    }

    /**
     * Currently, the preloading only works for the following files task parameters
     * - midiFileName
     * - videoFileName
     * - helperImageFileName
     * - audioFirst
     * - audioSecond
     */
    getListOfFilesForIndex(flow, index) {
        const block = flow[index];
        if (!block) return [];

        const {
            midiFileName,
            videoFileName,
            helperImageFileName,
            pictureFileName,
            audioFirst,
            audioSecond,
            answerChoicesImage,
        } = block;
        const fileNamesList = [
            midiFileName,
            videoFileName,
            helperImageFileName,
            pictureFileName,
            audioFirst,
            audioSecond,
            answerChoicesImage,
        ].flat(Infinity);

        const filteredNamesList = fileNamesList
            .filter(directory => Boolean(directory))        // Removing empty values
            .filter(directory => !directory.includes('$'))  // Removing names that depend on variables
            .sort((a, b) => {                               // Prioritize the videos
                // If 'a' ends with the specified ending, move it to the top (-1)
                if (a.endsWith('.mp4') && !b.endsWith('.mp4')) {
                    return -1;
                }
                // If 'b' ends with the specified ending, move 'b' to the top (1)
                if (!a.endsWith('.mp4') && b.endsWith('.mp4')) {
                    return 1;
                }
                // If both or neither end with the suffix, leave them in their relative order (0)
                return 0;
            });

        return [...new Set(filteredNamesList)];
    }

    getListOfFilesForWindow(flow, currentIndex = 0) {
        const centerIndex = Math.max(0, currentIndex - Math.round(this.windowSize / 2));
        const indexes = [...Array(this.windowSize).keys()].map(i => i + centerIndex);
        let allFilesNameList = [];
        for (const index of indexes) {
            const filesNameList = this.getListOfFilesForIndex(flow, index);
            allFilesNameList = allFilesNameList.concat(filesNameList);
        }
        return [...new Set(allFilesNameList)];
    }
}