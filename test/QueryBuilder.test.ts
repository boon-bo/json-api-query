import {suite, test, should, expect, chai} from './utility';
import {QueryBuilder} from '../src';
import {AndOperator, AnyOperator, EqualsOperator, NotOperator, OrOperator} from "../src/operators/dialect"
import {
    GreaterThan
} from "../src/operators/GreaterThan";
import {SparseFieldSet} from "../src";
import {Any} from "../src/operators/Any";
import {Contains} from "../src/operators/Contains";
import {EndsWith} from "../src/operators/EndsWith";
import {Has} from "../src/operators/Has";
import {StartsWith} from "../src/operators/StartsWith";
import {Or} from "../src/operators/Or";
import {Not} from "../src/operators/Not";
import {LessThanOrEqual} from "../src/operators/LessThanOrEqual";
import {LessThan} from "../src/operators/LessThan";
import {GreaterThanOrEqual} from "../src/operators/GreaterThanOrEqual";
import {Equals} from "../src/operators/Equals";

class TestClass {
    property1: string
    property2: boolean
    nested: NestedTestClass
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

class NestedNestedTestClass {
    property1Nested: string
    property2Nested: boolean
    nested: NestedTestClass
}

class NestedTestClass {
    property1Nested: string
    property2Nested: boolean
    nestedAgain: NestedNestedTestClass
}

should();

@suite
class QueryBuilderUnitTests {
    private sut: QueryBuilder<TestClass>

    // todo: test with modelname
    before() {
        this.sut = new QueryBuilder<TestClass>();
    }

    @test 'Can construct'() {
        expect(this.sut).should.be.not.undefined;
    }

    @test 'find - equals'() {
        let result = this.sut.find({
            where: {
                numProp: Equals(1)
            }
        }).build();

        expect(result).to.equal("?filter=equals(numProp,'1')")
    }

    @test 'find - equals implicit'() {
        let result = this.sut.find({
            where: {
                numProp: 1
            }
        }).build();

        expect(result).to.equal("?filter=equals(numProp,'1')")
    }

    @test 'find - any'() {
        let result = this.sut.find({
            where: {
                numProp: Any([1, 2, 3])
            }
        }).build();

        expect(result).to.equal("?filter=any(numProp,1,2,3)")
    }

    @test 'find - contains'() {
        let result = this.sut.find({
            where: {
                prop12: Contains("lol")
            }
        }).build();

        expect(result).to.equal("?filter=contains(prop12,'lol')")
    }

    @test 'find - endsWith'() {
        let result = this.sut.find({
            where: {
                prop12: EndsWith("lol")
            }
        }).build();

        expect(result).to.equal("?filter=endsWith(prop12,'lol')")
    }

    @test 'find - greaterThan'() {
        let result = this.sut.find({
            where: {
                numProp: GreaterThan(1)
            }
        }).build();

        expect(result).to.equal("?filter=greaterThan(numProp,'1')")
    }

    @test 'find - greaterThanOrEqual'() {
        let result = this.sut.find({
            where: {
                numProp: GreaterThanOrEqual(1)
            }
        }).build();

        expect(result).to.equal("?filter=greaterOrEqual(numProp,'1')")
    }

    @test 'find - lessThan'() {
        let result = this.sut.find({
            where: {
                numProp: LessThan(1)
            }
        }).build();

        expect(result).to.equal("?filter=lessThan(numProp,'1')")
    }

    @test 'find - lessThanOrEqual'() {
        let result = this.sut.find({
            where: {
                numProp: LessThanOrEqual(1)
            }
        }).build();

        expect(result).to.equal("?filter=lessOrEqual(numProp,'1')")
    }

    @test 'find - has'() {
        let result = this.sut.find({
            where: {
                numProp: Has([1, 2, 3])
            }
        }).build();

        expect(result).to.equal("?filter=has(numProp,1,2,3)")
    }

    @test 'find - not equals'() {
        let result = this.sut.find({
            where: {
                numProp: Not(Equals(1))
            }
        }).build();

        expect(result).to.equal("?filter=not(equals(numProp,'1'))")
    }

    @test 'find - not greater than'() {
        let result = this.sut.find({
            where: {
                numProp: Not(GreaterThan(1))
            }
        }).build();

        expect(result).to.equal("?filter=not(greaterThan(numProp,'1'))")
    }

    @test 'find - or'() {
        let result = this.sut.find({
            where: {
                numProp: Or([Has([1, 2, 3]), Equals(1)])
            }
        }).build();

        expect(result).to.equal("?filter=or(has(numProp,1,2,3),equals(numProp,'1'))")
    }

    @test 'find - or implicit'() {
        let result = this.sut.find({
            where: [{
                numProp: Has([1, 2, 3])
            }, {
                numProp: Equals(1)
            }]
        }).build();

        expect(result).to.equal("?filter=or(has(numProp,1,2,3),equals(numProp,'1'))")
    }

    @test 'find - startsWith'() {
        let result = this.sut.find({
            where: {
                property1: StartsWith("test")
            }
        }).build();

        expect(result).to.equal("?filter=startsWith(property1,'test')")
    }

    @test 'nesting'() {
        let result = this.sut.find({
            where: {
                nested: {
                    property1Nested: Equals("test")
                }
            }
        }).build();

        expect(result).to.equal("?filter[nested]=equals(property1Nested,'test')")
    }

    @test 'includes works'() {
        let result = this.sut.find({
            relations: {
                nested: {
                    nestedAgain: true
                },
            },
        }).build();
        expect(result).to.equal("?include=nested.nestedAgain")
    }

    // TODO: this needs to validate there are includes for the requested fieldsets
    @test 'sparse fieldsets works - simple'() {
        let result = this.sut.find({
            fields: {
                property2: true,

            }
        }).build();
        expect(result).to.equal("?fields=property2")
    }

    @test 'sparse fieldsets works - nested'() {
        let result = this.sut.find({
            fields: {
                nested: {
                    property2Nested: true,
                    nestedAgain: {
                        property1Nested: true
                    }
                },

            }
        }).build();
        expect(result).to.equal("?fields[nested]=property2Nested&fields[nested.nestedAgain]=property1Nested")
    }

    @test 'sparse fieldsets works - combined'() {
        let result = this.sut.find({
            fields: {
                nested: {
                    property2Nested: true,
                    nestedAgain: {
                        property1Nested: true
                    }
                },
                property2: true,

            }
        }).build();
        expect(result).to.equal("?fields[nested]=property2Nested&fields[nested.nestedAgain]=property1Nested&fields=property2")
    }

    // TODO: this needs to support multiple attrs
    // count and secondary endpoints
    @test 'order works - simple'() {
        let result = this.sut.find({
            order: {
                property2: "ASC",
            }
        }).build();
        expect(result).to.equal("?sort=property2")
    }

    @test 'order works - complex'() {
        let result = this.sut.find({
            order: {
                nested: {
                    property1Nested: "DESC",
                    property2Nested: {
                        direction: "ASC"
                    }
                }
            }
        }).build();
        expect(result).to.equal("?sort[nested]=property1Nested")
    }

    @test 'order works - complex with direction object'() {
        let result = this.sut.find({
            order: {
                nested: {
                    property2Nested: {
                        direction: "ASC"
                    }
                }
            }
        }).build();
        expect(result).to.equal("?sort[nested]=property2Nested")
    }

    @test 'order works - combined'() {
        let result = this.sut.find({
            order: {
                property2: "ASC",
                nested: {
                    property1Nested: "DESC",
                    property2Nested: {
                        direction: "ASC"
                    }
                }
            }
        }).build();
        expect(result).to.equal("?sort=property2&sort[nested]=property1Nested,-property2Nested")
    }

    @test 'page works'() {
        let result = this.sut.find({
            number: 10,
            size: 0
        }).build();
        expect(result).to.equal("?page[size]=0&page[number]=10")
    }

    @test 'two wheres makes an or - simple'() {
        let result = this.sut.find({
            where: [{
                a: 'b',
            }, {
                or1: 'or2',
            }]
        }).build();
        expect(result).to.equal("?filter=or(equals(a,'b'),equals(or1,'or2'))")
    }

    @test 'two wheres makes an or - nested - throws'() {
        expect(() => this.sut.find({
            where: [{
                nested: {
                    property1Nested: "test"
                }
            }, {
                nested: {
                    property2Nested: false
                }
            }]
        }).build()).to.throw('You can\'t do an implicit OR using nested properties')
    }


    @test 'ors and and'() {
        let result = this.sut.find({
            where:
                [{
                    stageName: StartsWith('Andy'),
                    isActive: true,
                    caeApproved: true,
                }, {
                    firstName: StartsWith('Andy'),
                    isActive: true,
                    caeApproved: true,
                }, {
                    lastName: StartsWith('Andy'),
                    isActive: true,
                    caeApproved: true,
                }]
        }).build()

        expect(result).to.equal("?filter=and(or(startsWith(stageName,'andy),startsWith(firstName,'andy),startsWith(lastName,'andy'),equals(isActive,true),equals(caeApproved,true))")
    }

    @test 'single where with multiple props generates ands'() {
        let result = this.sut.find({
            where:
                {
                    isActive: true,
                    caeApproved: true,
                }
        }).build()

        expect(result).to.equal("?filter=and(equals(isActive,'true'),equals(caeApproved,'true'))")
    }

    @test
    'complex query works'() {
        let result = this.sut.find({
            where: [{
                a: 'b',
                c: 'd',
                not1: Not(Equals('not2'))
            }, {
                or1: 'or2',
                or3: 'or4'
            }, {
                a: 'c',
                not1: Not(Equals('not5'))
            }],
            relations: {
                nested: true
            },
            fields: {
                nested: {
                    property2Nested: true
                }
            },
            number: 10,
            size: 0,
            order: {
                property2: "ASC"
            },
        }).build();
        expect(result).to.equal("?sort=property2&filter=or(equals(a,'b'),equals(c,'d'),not(equals(not1,'not2')),equals(or1,'or2'),equals(or3,'or4'),equals(a,'c'),not(equals(not1,'not5')))&include=nested&fields[nested]=property2Nested&page[size]=0&page[number]=10")
    }

    @test
    'complex query works 2'() {
        let result = this.sut.find({
            where:  {
                a: Contains("lol"),
                not1: Not(Equals('not5')),
                nested: {
                    property2Nested: true,
                    property1Nested: Has(['one', 'two']),
                    nestedAgain:{
                        property1Nested: EndsWith('wot')
                    }
                }
            },
            relations: {
                nested: true
            },
            fields: {
                firstName: true,
                lastName: true,
                nested: {
                    property2Nested: true
                }
            },
            number: 10,
            size: 0,
            order: {
                property2: "ASC",
                nested: {
                     property1Nested: "DESC"
                }
            },
        }).build();
        expect(result).to.equal("?sort=property2&sort[nested]=property1Nested&filter=and(contains(a,'lol'),not(equals(not1,'not5')))&include=nested&fields=firstName,lastName&fields[nested]=property2Nested&page[size]=0&page[number]=10&filter[nested]=and(equals(property2Nested,'true'),has(property1Nested,one,two))&filter[nestedAgain]=endsWith(property1Nested,'wot')")
    }
}
