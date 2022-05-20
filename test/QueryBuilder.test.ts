import {suite, test, should, expect, chai, timeout} from './utility'
import {QueryBuilder} from '../src'
import {GreaterThan, Any, Contains, EndsWith, Has, StartsWith, Or, Not, LessThanOrEqual, LessThan, GreaterThanOrEqual, Equals} from '../src'
import * as schema  from "./Models/schema.json"
import * as TJS from "typescript-json-schema";
import {TestClass} from "./Models/Models";
import { IBooking } from 'Models/IBooking';
should()

@suite
class QueryBuilderUnitTests {
    private sut: QueryBuilder<TestClass>

    before() {
        this.sut = new QueryBuilder<TestClass>("TestClass", schema as TJS.Definition, "", false, null, null)
    }

    @timeout(40000)
    @test 'Can construct'(done) {
        expect(this.sut).should.be.not.undefined
        done()
    }

    @test 'find - equals'() {
        let result = this.sut
            .find({
                where: {
                    numProp: Equals(1),
                },
            })
            .build()

        expect(result).to.equal("?filter=equals(numProp,'1')")
    }

    @test 'find - equals raw nested array'() {
        let result = this.sut
            .find({
                where: {
                   nestedArray:{
                          property1Nested: Equals('lol'),
                   }
                },
            })
            .build()

        expect(result).to.equal("?filter[nestedArray]=equals(property1Nested,'lol')")
    }

    @test 'find - equals raw nested not array'() {
        let result = this.sut
            .find({
                where: {
                   nested:{
                          property1Nested: Equals('lol'),
                   }
                },
            })
            .build()

        expect(result).to.equal("?filter=equals(nested.property1Nested,'lol')")
    }

    @test 'find - equals raw null'() {
        let result = this.sut
            .find({
                where: {
                    numProp: Equals(null),
                },
            })
            .build()

        expect(result).to.equal("?filter=equals(numProp,null)")
    }

    @test 'find - equals implicit'() {
        let result = this.sut
            .find({
                where: {
                    numProp: 1,
                },
            })
            .build()

        expect(result).to.equal("?filter=equals(numProp,'1')")
    }

    @test 'find - any'() {
        let result = this.sut
            .find({
                where: {
                    numProp: Any([1, 2, 3]),
                },
            })
            .build()

        expect(result).to.equal('?filter=any(numProp,1,2,3)')
    }

    @test 'find - contains'() {
        let result = this.sut
            .find({
                where: {
                    prop12: Contains('lol'),
                },
            })
            .build()

        expect(result).to.equal("?filter=contains(prop12,'lol')")
    }

    @test 'find - endsWith'() {
        let result = this.sut
            .find({
                where: {
                    prop12: EndsWith('lol'),
                },
            })
            .build()

        expect(result).to.equal("?filter=endsWith(prop12,'lol')")
    }

    @test 'find - greaterThan'() {
        let result = this.sut
            .find({
                where: {
                    numProp: GreaterThan(1),
                },
            })
            .build()

        expect(result).to.equal("?filter=greaterThan(numProp,'1')")
    }

    @test 'find - greaterThanOrEqual'() {
        let result = this.sut
            .find({
                where: {
                    numProp: GreaterThanOrEqual(1),
                },
            })
            .build()

        expect(result).to.equal("?filter=greaterOrEqual(numProp,'1')")
    }

    @test 'find - lessThan'() {
        let result = this.sut
            .find({
                where: {
                    numProp: LessThan(1),
                },
            })
            .build()

        expect(result).to.equal("?filter=lessThan(numProp,'1')")
    }

    @test 'find - lessThanOrEqual'() {
        let result = this.sut
            .find({
                where: {
                    numProp: LessThanOrEqual(1),
                },
            })
            .build()

        expect(result).to.equal("?filter=lessOrEqual(numProp,'1')")
    }

    @test 'find - has'() {
        let result = this.sut
            .find({
                where: {
                    numProp: Has([1, 2, 3]),
                },
            })
            .build()

        expect(result).to.equal('?filter=has(numProp,1,2,3)')
    }

    @test 'find - not equals'() {
        let result = this.sut
            .find({
                where: {
                    numProp: Not(Equals(1)),
                },
            })
            .build()

        expect(result).to.equal("?filter=not(equals(numProp,'1'))")
    }

    @test 'find - not greater than'() {
        let result = this.sut
            .find({
                where: {
                    numProp: Not(GreaterThan(1)),
                },
            })
            .build()

        expect(result).to.equal("?filter=not(greaterThan(numProp,'1'))")
    }

    @test 'find - or'() {
        let result = this.sut
            .find({
                where: {
                    numProp: Or([Has([1, 2, 3]), Equals(1)]),
                },
            })
            .build()

        expect(result).to.equal("?filter=or(has(numProp,1,2,3),equals(numProp,'1'))")
    }

    @test 'find - or implicit'() {
        let result = this.sut
            .find({
                where: [
                    {
                        numProp: Has([1, 2, 3]),
                    },
                    {
                        numProp: Equals(1),
                    },
                ],
            })
            .build()

        expect(result).to.equal("?filter=or(has(numProp,1,2,3),equals(numProp,'1'))")
    }

    @test 'find - startsWith'() {
        let result = this.sut
            .find({
                where: {
                    property1: StartsWith('test'),
                },
            })
            .build()

        expect(result).to.equal("?filter=startsWith(property1,'test')")
    }

    @test nesting() {
        let result = this.sut
            .find({
                where: {
                    nested: {
                        property1Nested: Equals('test'),
                    },
                },
            })
            .build()

        expect(result).to.equal("?filter=equals(nested.property1Nested,'test')")
    }

    @test 'includes works'() {
        let result = this.sut
            .find({
                relations: {
                    nested: {
                        nestedAgain: true,
                    },
                },
            })
            .build()
        expect(result).to.equal('?include=nested.nestedAgain')
    }

    // TODO: this needs to validate there are includes for the requested fieldsets
    @test 'sparse fieldsets works - simple'() {
        let result = this.sut
            .find({
                fields: {
                    property2: true,
                },
            })
            .build()
        expect(result).to.equal('?fields=property2')
    }

    @test 'sparse fieldsets works - nested'() {
        let result = this.sut
            .find({
                fields: {
                    nested: {
                        property2Nested: true,
                        nestedAgain: {
                            property1Nested: true,
                        },
                    },
                },
            })
            .build()
        expect(result).to.equal('?fields[nested]=property2Nested&fields[nestedAgain]=property1Nested')
    }

    @test 'sparse fieldsets works - combined'() {
        let result = this.sut
            .find({
                fields: {
                    nested: {
                        property2Nested: true,
                        nestedAgain: {
                            property1Nested: true,
                        },
                    },
                    property2: true,
                },
            })
            .build()
        expect(result).to.equal(
            '?fields[nested]=property2Nested&fields[nestedAgain]=property1Nested&fields=property2',
        )
    }

    // TODO: this needs to support multiple attrs
    // count and secondary endpoints
    @test 'order works - simple'() {
        let result = this.sut
            .find({
                order: {
                    property2: 'ASC',
                },
            })
            .build()
        expect(result).to.equal('?sort=property2')
    }

    @test 'order works - complex'() {
        let result = this.sut
            .find({
                order: {
                    nested: {
                        property1Nested: 'DESC',
                        property2Nested: {
                            direction: 'ASC',
                        },
                    },
                },
            })
            .build()
        expect(result).to.equal('?sort[nested]=property1Nested,-property2Nested')
    }

    @test 'order works - complex with direction object'() {
        let result = this.sut
            .find({
                order: {
                    nested: {
                        property2Nested: {
                            direction: 'ASC',
                        },
                    },
                },
            })
            .build()
        expect(result).to.equal('?sort[nested]=property2Nested')
    }

    @test 'order works - combined'() {
        let result = this.sut
            .find({
                order: {
                    property2: 'ASC',
                    nested: {
                        property1Nested: 'DESC',
                        property2Nested: {
                            direction: 'ASC',
                        },
                    },
                },
            })
            .build()
        expect(result).to.equal('?sort=property2&sort[nested]=property1Nested,-property2Nested')
    }

    @test 'page works'() {
        let result = this.sut
            .find({
                number: 10,
                size: 0,
            })
            .build()
        expect(result).to.equal('?page[size]=0&page[number]=10')
    }

    @test 'page as strings works'() {
        let result = this.sut
            .find({
                number: "10,something:20",
                size: "10,something:20",
            })
            .build()
        expect(result).to.equal('?page[size]=10,something:20&page[number]=10,something:20')
    }

    @test 'two wheres makes an or - simple'() {
        let result = this.sut
            .find({
                where: [
                    {
                        a: 'b',
                    },
                    {
                        or1: 'or2',
                    },
                ],
            })
            .build()
        expect(result).to.equal("?filter=or(equals(a,'b'),equals(or1,'or2'))")
    }

    @test 'ors and and'() {
        let result = this.sut
            .find({
                where: [
                    {
                        stageName: StartsWith('Andy'),
                        isActive: true,
                        caeApproved: true,
                    },
                    {
                        firstName: StartsWith('Andy'),
                        isActive: true,
                        caeApproved: true,
                    },
                    {
                        lastName: StartsWith('Andy'),
                        isActive: true,
                        caeApproved: true,
                    },
                ],
            })
            .build()

        expect(result).to.equal(
            "?filter=or(and(startsWith(stageName,'Andy'),equals(isActive,'true'),equals(caeApproved,'true')),and(startsWith(firstName,'Andy'),equals(isActive,'true'),equals(caeApproved,'true')),and(startsWith(lastName,'Andy'),equals(isActive,'true'),equals(caeApproved,'true')))",
        )
    }

    @test 'single where with multiple props generates ands'() {
        let result = this.sut
            .find({
                where: {
                    isActive: true,
                    caeApproved: true,
                },
            })
            .build()

        expect(result).to.equal("?filter=and(equals(isActive,'true'),equals(caeApproved,'true'))")
    }

    @test
    'regression 20 may 2022'(){
        let sut = new QueryBuilder<IBooking>("IBooking", schema as TJS.Definition, "", false, null, null)

        let result = sut
            .find({
                size: 10,
                number: 1,
                where: {
                    approvedDate: Equals(null),
                    venue: {
                        name: StartsWith('Andy'),
                    },
                },
                relations: {
                    artists: {
                        images: true,
                    },
                    venue: true
                },
            })
            .build();

            expect(result).to.equal('?filter=equals(approvedDate,null)&include=artists.images,venue&page[size]=10&page[number]=1&filter=startsWith(venue.name,\'Andy\')')
    }

    @test
    'complex query works'() {
        let result = this.sut
            .find({
                where: [
                    {
                        a: 'b',
                        c: 'd',
                        not1: Not(Equals('not2')),
                    },
                    {
                        or1: 'or2',
                        or3: 'or4',
                    },
                    {
                        a: 'c',
                        not1: Not(Equals('not5')),
                    },
                ],
                relations: {
                    nested: true,
                },
                fields: {
                    nested: {
                        property2Nested: true,
                    },
                },
                number: 10,
                size: 0,
                order: {
                    property2: 'ASC',
                },
            })
            .build()
        expect(result).to.equal(
            "?sort=property2&filter=or(and(equals(a,'b'),equals(c,'d'),not(equals(not1,'not2'))),and(equals(or1,'or2'),equals(or3,'or4')),and(equals(a,'c'),not(equals(not1,'not5'))))&include=nested&fields[nested]=property2Nested&page[size]=0&page[number]=10",
        )
    }

    @test
    'complex query works 2'() {
        let result = this.sut
            .find({
                where: {
                    a: Contains('lol'),
                    not1: Not(Equals('not5')),
                    nested: {
                        property2Nested: true,
                        property1Nested: Has(['one', 'two']),
                        nestedAgain: {
                            property1Nested: EndsWith('wot'),
                        },
                    },
                },
                relations: {
                    nested: true,
                },
                fields: {
                    firstName: true,
                    lastName: true,
                    nested: {
                        property2Nested: true,
                    },
                },
                number: 10,
                size: 0,
                order: {
                    property2: 'ASC',
                    nested: {
                        property1Nested: 'DESC',
                    },
                },
            })
            .build()
        expect(result).to.equal(
            "?sort=property2&sort[nested]=property1Nested&filter=and(contains(a,'lol'),not(equals(not1,'not5')))&include=nested&fields=firstName,lastName&fields[nested]=property2Nested&page[size]=0&page[number]=10&filter=and(equals(property2Nested,'true'),has(nested.property1Nested,one,two))&filter=endsWith(nested.nestedAgain.property1Nested,'wot')",
        )
    }
}
