import { EndsWithOperator } from '../../src'
import { suite, test, should, expect } from '../utility'

should()
@suite
class EndsWithOperatorUnitTests {
    private SUT: EndsWithOperator

    before() {
        this.SUT = new EndsWithOperator('property', 'value1')
    }

    @test 'Can construct'() {
        expect(this.SUT).should.be.not.undefined
    }

    @test 'toString works'() {
        expect(this.SUT.toString()).to.equal("endsWith(property,'value1')")
    }
}
