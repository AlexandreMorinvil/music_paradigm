export class ListTableStateBackup {
    constructor(tableStateBackup) {
        this.columnKeysList = tableStateBackup?.columnKeysList;
        this.filtersList = tableStateBackup?.filtersList;
    }    

    toObject() {
        const { ...object } = this;
        return object;
    }
}