/* eslint-env node, jest */
import { Map as ImMap, List as ImList } from 'immutable';
import { isMapLike, get, getIn } from './utils';

describe('Test utils', () => {
  describe('isMapLike', () => {
    it('should be Map like', () => {
      expect(isMapLike(new Map())).toBe(true);
      expect(isMapLike(ImMap())).toBe(true);
      expect(isMapLike(ImList())).toBe(true);
      expect(isMapLike({ get() {}, has() {} })).toBe(true);
    });

    it("shouldn't be Map like", () => {
      expect(isMapLike(new Set())).toBe(false);
      expect(isMapLike({})).toBe(false);
      expect(isMapLike([])).toBe(false);
      expect(isMapLike('string')).toBe(false);
      expect(isMapLike(true)).toBe(false);
      expect(isMapLike(null)).toBe(false);
      expect(isMapLike(undefined)).toBe(false);
    });
  });

  describe('get', () => {
    it('should return value', () => {
      let test = 'test-value';
      expect(get({ test }, 'test')).toBe(test);
      expect(get(new Map([['test', test]]), 'test')).toBe(test);
      expect(get(ImMap({ test }), 'test')).toBe(test);
      expect(get(ImList([test]), 0)).toBe(test);
      expect(get([test], 0)).toBe(test);
      expect(get([test], '0')).toBe(test);
    });

    it('should return notSetValue', () => {
      let notSetValue = 'notSetValue';

      expect(get(undefined, 'test', notSetValue)).toBe(notSetValue);
      expect(get(null, 'test', notSetValue)).toBe(notSetValue);
      expect(get({}, 'test', notSetValue)).toBe(notSetValue);
      expect(get(new Map(), 'test', notSetValue)).toBe(notSetValue);
      expect(get(ImMap(), 'test', notSetValue)).toBe(notSetValue);
      expect(get(ImList(), 0, notSetValue)).toBe(notSetValue);
      expect(get([test], 1, notSetValue)).toBe(notSetValue);
      expect(get([], '0', notSetValue)).toBe(notSetValue);
    });
  });

  it('should return value when its undefined, rather then notSetValue', () => {
    let notSetValue = 'notSetValue';
    let test = undefined;

    expect(get({ test }, 'test', notSetValue)).toBe(undefined);
    expect(get(ImMap({ test }), 'test', notSetValue)).toBe(undefined);
    expect(get([test], 0, notSetValue)).toBe(undefined);
  });

  describe('getIn', () => {
    let Test = {
      i: ImMap({
        0: '0',
        m: new Map([[0, 0], ['key', 'value']]),
        l: ImList([{}, [], [{ t: 'test' }]]),
      }),
    };

    it('should return value', () => {
      expect(getIn(Test, ['i', '0'])).toBe('0');
      expect(getIn(Test, ['i'])).toBe(Test.i);
      expect(getIn(Test, ['i', 'm', 0])).toBe(0);
      expect(getIn(Test, ['i', 'm', 'key'])).toBe('value');
      expect(getIn(Test, ['i', 'l', 0])).toBe(Test.i.get('l').get(0));
      expect(getIn(Test, ['i', 'l', '1'])).toBe(Test.i.get('l').get('1'));
      expect(getIn(Test, ['i', 'l', 2, 0, 't'])).toBe('test');
    });

    it('should return notSetValue', () => {
      let notSetValue = 'notSetValue';
      expect(getIn(Test, ['i', '0', 10], notSetValue)).toBe(notSetValue);
      expect(getIn(Test, ['lkasjdf'], notSetValue)).toBe(notSetValue);
      expect(getIn(Test, ['i', 'm', '0'], notSetValue)).toBe(notSetValue);
    });

    it('should return collection when empty array provided', () => {
      let Test = {};
      expect(getIn(Test, [])).toBe(Test);
    });
  });
});
