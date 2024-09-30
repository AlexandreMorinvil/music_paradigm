import config from '@/config';

import { PreloaderResourcesSlidingWindow } from './preloader-resources-sliding-window';
import { PreloaderStorage } from './preloader-storage';

export class Preloader {

    constructor() {
        this.baseUrl = config.apiUrl;
        this.baseFolder = '/experiment_resources/';
        this.storage = new PreloaderStorage();
        this.resourcesSlindingWindow = new PreloaderResourcesSlidingWindow();
    }

    async preloadListOfFilesBasedOnSlidingWindow(flow, index = 0, mustCleanupUnusedUrls = true) {
        const directoriesList = this.resourcesSlindingWindow
            .getListOfFilesForWindow(flow, index)
            .map(directory => this.baseFolder + directory);

        const urlsList = [];

        for (const directory of directoriesList) {
            const url = await this.downloadFile(directory);
            urlsList.push(url);
        }

        if (mustCleanupUnusedUrls)
            this.storage.removeUnspecifiedUrl(urlsList);
    }

    async preloadFile(directory, index) {
        if (!this.storage.hasFile(directory))
            await this.loadFile(directory, index);
    }

    async downloadFile(directory) {

        // Generate the url
        const url = this.baseUrl + directory;

        // If the file is already loaded, we ignore it
        if (this.storage.hasFile(url))
            return url;

        try {
            // Fetch the file from the URL
            // console.log('Preloading:', url);
            const response = await fetch(url, {
                headers: {
                  'X-Requested-With': 'XMLHttpRequest'
                }
              });

            // Ensure the request was successful
            if (!response.ok) {
                throw new Error(`Failed to preload file: ${response.statusText}`);
            }

            // Convert the response into a Blob (binary large object) and create an object URL for 
            // the Blob 
            const fileBlob = await response.blob();
            const fileObjectUrl = URL.createObjectURL(fileBlob);

            // Store the file for later use
            this.storage.addFile(url, fileObjectUrl);

        } catch (error) {
            console.log(error);
        }

        return url;
    }

    getUrlObjectIfPresent(url) {
        return this.storage.retrieveObectUrl(url);
    }

    reset() {
        this.baseUrl = config.apiUrl;
        this.storage.clear();
    }

    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
    }

    setBaseFolder(folder) {
        this.baseFolder = '/experiment_resources/' + (folder ? `${folder}/` : '');
    }
}