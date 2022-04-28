import { suite, test, should, expect } from '../utility'
import { LessThanOrEqualOperator } from '../../src/'

should()
@suite
class LessThanOrEqualOperatorUnitTests {
    private SUT: LessThanOrEqualOperator

    before() {
        this.SUT = new LessThanOrEqualOperator('property', 'value1')
    }

    @test 'Can construct'() {
        expect(this.SUT).should.be.not.undefined
    }

    @test 'toString works'() {
        expect(this.SUT.toString()).to.equal("lessOrEqual(property,'value1')")
    }
}
