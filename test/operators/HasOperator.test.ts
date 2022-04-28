import { suite, test, should, expect } from '../utility'
import { EqualsOperator, HasOperator } from '../../src/'

should()
@suite
class HasOperatorUnitTests {
    private SUT: HasOperator

    @test 'Can construct'() {
        expect(this.SUT).should.be.not.undefined
    }

    @test 'toString works'() {
        this.SUT = new HasOperator('value1')
        expect(this.SUT.toString()).to.equal("has('value1')")
    }

    @test 'toString works with filterCondition'() {
        this.SUT = new HasOperator('collection', new EqualsOperator('property1', 'value2'))
        expect(this.SUT.toString()).to.equal("has(collection,equals(property1,'value2'))")
    }
}
