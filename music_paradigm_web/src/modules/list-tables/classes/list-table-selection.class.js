export class ListTableSelection {
    constructor() {
        // The context is used handle selections shared between more than one list tables. When selecting a new item, 
        // the context ensures that it is only possible to select elements from one table at a time. 
        this.context = null;
        this.idsList = [];
    }

    get elementsCount() {
        return this.idsList.length;
    }

    get hasElements() {
        return this.idsList.length > 0;
    }

    add(element, context) {
        this.changeContext(context);
        const idToAdd = this.transformIntoId(element);
        this.idsList.splice(this.idsList.length, 0, idToAdd);
        this.idsList = [...new Set(this.idsList)]; // Remove duplicates
    }

    addList(elementsList = [], context) {
        elementsList.forEach(element => this.add(element, context));
    }

    changeContext(context) {
        if (!context) return;
        if (this.context !== context) {
            this.empty();
            this.context = context;
        }
    }

    isContextContaining(substring) {
        if (!this.context) return false;
        return String(this.context)
            .toLowerCase()
            .includes(substring?.toLowerCase());
    }

    empty() {
        this.context = null;
        this.idsList = [];
    }

    includes(element) {
        const idToFind = this.transformIntoId(element);
        return this.idsList.includes(idToFind);
    }

    isSameContext(context) {
        return this.context === context;
    }

    remove(element) {
        const idToRemove = this.transformIntoId(element);
        this.idsList = this.idsList.filter((id) => id !== idToRemove);
        if (this.elementsCount === 0) this.context = null;
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

    toggleSelection(element, context) {
        const isElementPresent = this.includes(element);
        if (isElementPresent) this.remove(element);
        else this.add(element, context);
    }

    transformIntoId(element) {
        return element?._id ?? element;
    }
}