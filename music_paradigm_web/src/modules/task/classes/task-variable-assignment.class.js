import { AssignmentType, ValueSelectionType, VariableType } from '../interfaces/assignment.interfaces';
import { TaskVariable } from './task-variable.class';

export class TaskVariableAssignment {
    constructor(taskVariable = new TaskVariable(), imposedValue = null) {

        this.taskVariable = taskVariable ?? null;

        // Imposed value for parameter variables that are assigned a specific value
        this.imposedValue = imposedValue ?? null;

        // Initial assignent attributes
        this.initialValue = null;
        this.currentValue = null;

        // TODO:    Implement this with a more robust logic to better handle the state variables and the task variables. 
        //          The logic of the appliction should be adjusted in order to handle the state variables and the 
        //          variables that come from the definition of the task separately. Until this is done, this variable is
        //          necessary. 
        // State variables are built in variables that are not specified in the desciption of the task. The state 
        // variable indicator is always false for this class. The "TaskVariableAssignement" objects are never state 
        // variables as those variables are always specified in the definition of the task. 
        this.isStateVariable = false;
    }

    get isConstant() {
        return this.taskVariable?.assignation === AssignmentType.constant;
    }

    get optionValues() {
        return this.taskVariable?.optionValues;
    }

    get scheduleName() {
        return this.taskVariable?.scheduleName;
    }

    get valueSelectionType() {
        return this.taskVariable?.valueSelectionType;
    }

    get _hasImposedValue() {
        const isImposedValueDefined = Object.prototype.hasOwnProperty.call(this, 'imposedValue');
        const isImposedValueNotNull = this.imposedValue !== null;
        return isImposedValueDefined && isImposedValueNotNull;
    }

    setVariableAssignment(taskVariable = new TaskVariable()) {
        this.taskVariable = taskVariable ?? new TaskVariable();
        this._setInitialValue(taskVariable);
    }

    _setInitialValue(taskVariable = new TaskVariable()) {
        const hasImposedValue = this._hasImposedValue;
        const isImposedValueValid = taskVariable.isValueAssignmentAccepted(this.imposedValue);

        if (hasImposedValue && isImposedValueValid) 
            this.initialValue = this.imposedValue;
        else
            this.initialValue = taskVariable.assignedValue;
        
        this.currentValue = this.initialValue;
    }
}