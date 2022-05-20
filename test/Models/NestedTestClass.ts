import { NestedNestedTestClass } from "./NestedNestedTestClass";


export interface NestedTestClass {
    property1Nested: string;
    property2Nested: boolean;
    nestedAgain: NestedNestedTestClass;
}
