import { suite, test, should, expect } from '../utility'
import { StartsWithOperator } from '../../src/'

should()
@suite
class StartsWithOperatorUnitTests {
    private SUT: StartsWithOperator

    before() {
        this.SUT = new StartsWithOperator('property', 'value')
    }

    @test 'Can construct'() {
        expect(this.SUT).should.be.not.undefined
    }

    @test 'toString works'() {
        expect(this.SUT.toString()).to.equal("startsWith(property,'value')")
    }
}
