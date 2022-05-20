export interface TestClass {
    property1: string
    property2: boolean
    nested: NestedTestClass
    nestedArray: NestedTestClass[]
    a: string
    c: string
    not1: string
    or1: string
    or3: string
    PropertyAny: string
    prop12: string
    numProp: number
    stageName: string
    lastName: string
    firstName: string
    caeApproved: boolean
    isActive: boolean
}

export interface NestedNestedTestClass {
    property1Nested: string
    property2Nested: boolean
    nested: NestedTestClass
}

export interface NestedTestClass {
    property1Nested: string
    property2Nested: boolean
    nestedAgain: NestedNestedTestClass
}
