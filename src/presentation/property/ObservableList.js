import {ObservableProperty} from "./ObservableProperty.js";

export const observableListOf = (value) => new ObservableList(value)

export class ObservableList extends ObservableProperty {

    constructor(value) {
        super(value)
    }

    append = (values) => {
        this.setValue([...this.getValue(), ...values])
    }
}