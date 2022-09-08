import { filterView2rule, filterView2name } from '@dataplug/tasenor-common'

test('Filter view to rule conversions', async () => {

  // TODO: Case is still sensitive!
  expect(filterView2rule({
    op: 'caseInsensitiveMatch',
    field: 'x',
    text: 'Simple'
  })).toBe('(lower(x) === "simple")')

  expect(filterView2rule({
    op: 'caseInsensitiveMatch',
    field: 'x',
    text: '"A"'
  })).toBe('(lower(x) === "\\\"a\\\"")')

  expect(filterView2rule({
    op: 'caseInsensitiveMatch',
    field: 'A&B',
    text: 'Simple'
  })).toBe('(lower($("A&B")) === "simple")')

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

  expect(filterView2rule([{
    op: 'caseInsensitiveMatch',
    field: 'y2',
    text: 'Simple'
  },{
    op: 'isGreaterThan',
    field: 'num',
    value: 0
  }])).toBe('(lower(y2) === "simple") && (num > 0)')
})

test('Filter view to name conversion', async () => {

  expect(filterView2name({
    op: 'caseInsensitiveMatch',
    field: 'x',
    text: 'Simple'
  })).toBe("x in lower case contains 'simple'")

  expect(filterView2name({
    op: 'caseInsensitiveMatch',
    field: 'x',
    text: '"A"'
  })).toBe("x in lower case contains '\"a\"'")

  expect(filterView2name({
    op: 'caseInsensitiveMatch',
    field: 'A&B',
    text: 'Simple'
  })).toBe("A&B in lower case contains 'simple'")

  expect(filterView2name({
    op: 'isLessThan',
    field: 'num',
    value: 0
  })).toBe('num is less than 0')

  expect(filterView2name({
    op: 'isGreaterThan',
    field: 'num',
    value: 0
  })).toBe('num is greater than 0')

  expect(filterView2name([{
    op: 'caseInsensitiveMatch',
    field: 'y2',
    text: 'Simple'
  },{
    op: 'isGreaterThan',
    field: 'num',
    value: 0
  }])).toBe("y2 in lower case contains 'simple' and num is greater than 0")
})
