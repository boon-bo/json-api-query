import { GreaterThanOrEqualOperator } from '../../src';
import { suite, test, should, expect } from '../utility';

should();
@suite class GreaterThanOrEqualOperatorUnitTests {
  private SUT: GreaterThanOrEqualOperator

  before() {
    this.SUT = new GreaterThanOrEqualOperator('property', 'value1');
  }

  @test 'Can construct'() {
    expect(this.SUT).should.be.not.undefined;
  }

  @test 'toString works'() {
    expect(this.SUT.toString()).to.equal("greaterOrEqual(property,'value1')");
  }
}
