import { EqualsOperator } from '../../src'
import { suite, test, should, expect } from '../utility'

should()
@suite
class EqualsOperatorUnitTests {
    private SUT: EqualsOperator

    before() {
        this.SUT = new EqualsOperator('property', 'value1')
    }

    @test 'Can construct'() {
        expect(this.SUT).should.be.not.undefined
    }

    @test 'toString works'() {
        expect(this.SUT.toString()).to.equal("equals(property,'value1')")
    }
}
