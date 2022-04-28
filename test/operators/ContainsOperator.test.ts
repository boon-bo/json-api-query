import { ContainsOperator } from '../../src'
import { suite, test, should, expect } from '../utility'

should()
@suite
class ContainsOperatorUnitTests {
    private SUT: ContainsOperator

    before() {
        this.SUT = new ContainsOperator('property', 'value1')
    }

    @test 'Can construct'() {
        expect(this.SUT).should.be.not.undefined
    }

    @test 'toString works'() {
        expect(this.SUT.toString()).to.equal("contains(property,'value1')")
    }
}
