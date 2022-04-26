import { suite, test, should, expect } from '../utility';
import { EqualsOperator, NotOperator } from '../../src/';

should();
@suite class NotOperatorUnitTests {
  private SUT: NotOperator

  before() {
    this.SUT = new NotOperator(new EqualsOperator("property", "value"));
  }

  @test 'Can construct'() {
    expect(this.SUT).should.be.not.undefined;
  }

  @test 'toString works'() {
    expect(this.SUT.toString()).to.equal("not(equals(property,'value'))");
  }
}
