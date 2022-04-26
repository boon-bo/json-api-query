import {InstanceChecker} from "./InstanceChecker";
import {FindOperatorType} from "./FindOperatorType";
import {ObjectLiteral} from "./ObjectLiteral";

export class FindOperator<T> {
    readonly "@instanceof" = Symbol.for("FindOperator")

    // -------------------------------------------------------------------------
    // Private Properties
    // -------------------------------------------------------------------------

    /**
     * Operator type.
     */
    private readonly _type: FindOperatorType

    /**
     * Parameter value.
     */
    private readonly _value:  T | FindOperator<T> | FindOperator<T>[]

    /**
     * ObjectLiteral parameters.
     */
    private readonly _objectLiteralParameters: ObjectLiteral | undefined

    /**
     * Indicates if parameter is used or not for this operator.
     */
    private readonly _useParameter: boolean

    /**
     * Indicates if multiple parameters must be used for this operator.
     */
    private readonly _multipleParameters: boolean

    constructor(
        type: FindOperatorType,
        value: T | FindOperator<T> | FindOperator<T>[],
        useParameter: boolean = true,
        multipleParameters: boolean = false,
        objectLiteralParameters?: ObjectLiteral,
    ) {
        this._type = type
        this._value = value
        this._useParameter = useParameter
        this._multipleParameters = multipleParameters
        this._objectLiteralParameters = objectLiteralParameters
    }

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    /**
     * Indicates if parameter is used or not for this operator.
     * Extracts final value if value is another find operator.
     */
    get useParameter(): boolean {
        if (InstanceChecker.isFindOperator(this._value))
            return this._value.useParameter

        return this._useParameter
    }

    /**
     * Indicates if multiple parameters must be used for this operator.
     * Extracts final value if value is another find operator.
     */
    get multipleParameters(): boolean {
        if (InstanceChecker.isFindOperator(this._value))
            return this._value.multipleParameters

        return this._multipleParameters
    }

    /**
     * Gets the Type of this FindOperator
     */
    get type(): FindOperatorType {
        return this._type
    }

    /**
     * Gets the final value needs to be used as parameter value.
     */ 
    get value(): T | FindOperator<T>[] {
        if (InstanceChecker.isFindOperator(this._value))
            return this._value.value

        // TODO: check if this is an array - if it is? what then?
        return this._value
    }

    /**
     * Gets ObjectLiteral parameters.
     */
    get objectLiteralParameters(): ObjectLiteral | undefined {
        if (InstanceChecker.isFindOperator(this._value))
            return this._value.objectLiteralParameters

        return this._objectLiteralParameters
    }

    /**
     * Gets the child FindOperator if it exists
     */
    get child(): FindOperator<T> | undefined {
        if (InstanceChecker.isFindOperator(this._value)) return this._value

        return undefined
    }
}
