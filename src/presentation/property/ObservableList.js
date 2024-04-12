export const observableListOf = (value) => new ObservableList(value)

export class ObservableList {

    #observers = []
    #value

    constructor(value) {
        this.#value = value
    }

    setValue = (value) => {
        this.#value = value
        this.#notifyAll()
    }

    append = (values) => {
        this.#value = [...this.#value, ...values]
        this.#notifyAll()
    }

    #notifyAll = () => this.#observers.forEach(o => o(this.#value))

    getValue = () => this.#value

    observe = (func) => {
        this.#observers.push(func)
        func(this.#value)
    }

    toImmutable = () => ({
        observe: this.observe,
        getValue: this.getValue
    })
}