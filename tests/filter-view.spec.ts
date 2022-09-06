import { filterView2rule } from '@dataplug/tasenor-common'

test('Filter view to rule conversions', async () => {

  expect(filterView2rule({
    op: 'caseInsensitiveMatch',
    field: 'x',
    text: 'Simple'
  })).toBe('(x = "Simple")')

  expect(filterView2rule({
    op: 'caseInsensitiveMatch',
    field: 'x',
    text: '"A"'
  })).toBe('(x = "\\\"A\\\"")')

  expect(filterView2rule({
    op: 'caseInsensitiveMatch',
    field: 'A&B',
    text: 'Simple'
  })).toBe('($("A&B") = "Simple")')

  expect(filterView2rule({
    op: 'isLessThan',
    field: 'num',
    value: 0
  })).toBe('(num < 0)')

  expect(filterView2rule({
    op: 'isGreaterThan',
    field: 'num',
    value: 0
  })).toBe('(num > 0)')

})
