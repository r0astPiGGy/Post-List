export const observableOf = (value) => new ObservableProperty(value)

export class ObservableProperty {

    #observers = []
    #value

    constructor(value) {
        this.#value = value
    }

    setValue = (value) => {
        this.#value = value
        this.#observers.forEach(o => o(this.#value))
    }

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