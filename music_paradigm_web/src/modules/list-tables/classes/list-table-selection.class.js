export class ListTableSelection {
    constructor() {
        this.idsList = [];
    }

    get elementsCount() {
        return this.idsList.length;
    }

    get hasElements() {
        return this.idsList.length > 0;
    }

    add(element) {
        const idToAdd = this.transformIntoId(element);
        this.idsList.splice(this.idsList.length, 0, idToAdd);
        this.idsList = [...new Set(this.idsList)]; // Remove duplicates
    }

    addList(elementsList = []) {
        elementsList.forEach(element => this.add(element));
    }

    empty() {
        this.idsList = [];
    }

    includes(element) {
        const idToFind = this.transformIntoId(element);
        return this.idsList.includes(idToFind);
    }

    remove(element) {
        const idToRemove = this.transformIntoId(element);
        this.idsList = this.idsList.filter((id) => id !== idToRemove);
    }

    removeIfIn(elementsToRemoveList) {
        const idsToRemoveList = elementsToRemoveList.map((element) => this.transformIntoId(element));
        this.idsList.forEach((idSelected) => {
            if (idsToRemoveList.includes(idSelected))
                this.remove(idSelected);
        })
    }

    removeIfNotIn(elementsAutorizedList) {
        const idsAutorizedList = elementsAutorizedList.map((element) => this.transformIntoId(element));
        this.idsList.forEach((idSelected) => {
            if (!idsAutorizedList.includes(idSelected))
                this.remove(idSelected);
        })
    }

    toggleSelection(element) {
        const isElementPresent = this.includes(element);
        if (isElementPresent) this.remove(element);
        else this.add(element);
    }

    transformIntoId(element) {
        return element?._id ?? element;
    }
}