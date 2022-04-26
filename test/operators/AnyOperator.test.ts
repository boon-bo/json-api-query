import { AnyOperator } from '../../src';
import { suite, test, should, expect } from '../utility';

should();
@suite class AnyOperatorUnitTests {
  private SUT: AnyOperator

  before() {
    this.SUT = new AnyOperator('property', 'value1', 'value2');
  }

  @test 'Can construct'() {
    expect(this.SUT).should.be.not.undefined;
  }

  @test 'toString works'() {
    expect(this.SUT.toString()).to.equal('any(property,value1,value2)');
  }
}
