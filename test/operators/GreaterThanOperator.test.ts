import { GreaterThanOperator } from '../../src'
import { suite, test, should, expect } from '../utility'

should()
@suite
class GreaterThanOperatorUnitTests {
    private SUT: GreaterThanOperator

    before() {
        this.SUT = new GreaterThanOperator('property', 'value1')
    }

    @test 'Can construct'() {
        expect(this.SUT).should.be.not.undefined
    }

    @test 'toString works'() {
        expect(this.SUT.toString()).to.equal("greaterThan(property,'value1')")
    }
}
