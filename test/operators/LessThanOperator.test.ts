import { suite, test, should, expect } from '../utility'
import { LessThanOperator } from '../../src/'

should()
@suite
class LessThanOperatorUnitTests {
    private SUT: LessThanOperator

    before() {
        this.SUT = new LessThanOperator('property', 'value1')
    }

    @test 'Can construct'() {
        expect(this.SUT).should.be.not.undefined
    }

    @test 'toString works'() {
        expect(this.SUT.toString()).to.equal("lessThan(property,'value1')")
    }
}
