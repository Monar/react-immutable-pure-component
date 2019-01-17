/* eslint-env node, jest */
import { Map, List, fromJS } from 'immutable';
import { check } from './utils';

describe('Test check', () => {
  describe('should not update', () => {
    it('against empty checklist', () => {
      let result = check([], { a: 1 }, { a: 2 }, 'test');
      let result_props = check(undefined, {}, {}, 'test');

      expect(result).toBe(true);
      expect(result_props).toBe(true);
    });

    it('when same instance', () => {
      let value = { a: 1, b: () => {} };
      let result = check(undefined, { a: value }, { a: value }, 'test');
      expect(result).toBe(true);
    });

    it('when same instances shallowed copied', () => {
      let value = { a: 1, b: () => {}, c: {} };
      let result = check(undefined, value, { ...value }, 'test');
      expect(result).toBe(true);
    });

    it('same immutable values new instances', () => {
      let setA = { a: Map({ b: '123', c: List() }) };
      let setB = { a: Map({ b: '123', c: List() }) };
      let result = check(undefined, setA, setB, 'test');
      expect(result).toBe(true);
    });
  });

  describe('should update', () => {
    it('when prev and next have different items', () => {
      expect(check(undefined, {}, { a: 1 }, 'test')).toBe(false);
      expect(check(undefined, { a: 1 }, {}, 'test')).toBe(false);
      expect(check(undefined, { a: 1 }, { b: 1 }, 'test')).toBe(false);
      expect(check(undefined, { a: 1, c: 1 }, { b: 1 }, 'test')).toBe(false);
      expect(check(undefined, { a: 1 }, { b: 1, c: 1 }, 'test')).toBe(false);
    });

    it('when modified any of the values', () => {
      expect(check(undefined, { a: 1, b: 2 }, { a: 1, b: 1 }, 'test')).toBe(
        false,
      );
      expect(check(undefined, { a: {} }, { a: {} }, 'test')).toBe(false);
      expect(check(undefined, { a: List([1]) }, { a: List([2]) }, 'test')).toBe(
        false,
      );
    });
  });

  describe('should work with config', () => {
    it('when empty and values change', () => {
      expect(check([], {}, { a: 1 }, 'test')).toBe(true);
      expect(check([], { a: 1 }, {}, 'test')).toBe(true);
      expect(check([], { a: 1 }, { b: 1 }, 'test')).toBe(true);
      expect(check([], { a: 2 }, { a: 1 }, 'test')).toBe(true);
    });

    it('when defined but other values change', () => {
      expect(check(['a'], {}, {}, 'test')).toBe(true);
      expect(check(['a'], {}, { b: 1 }, 'test')).toBe(true);
      expect(check(['a'], { b: 1 }, {}, 'test')).toBe(true);
      expect(check(['a'], { a: 1, b: 2 }, { a: 1, b: 1 }, 'test')).toBe(true);
      expect(check(['a'], { a: 1 }, { a: 1 }, 'test')).toBe(true);
    });

    it('when one of defined value changes', () => {
      expect(check(['a', 'z'], {}, { a: 1 }, 'test')).toBe(false);
      expect(check(['a', 'z'], { a: 1 }, {}, 'test')).toBe(false);
      expect(check(['a', 'z'], { a: 1, b: 2 }, { a: 2, b: 2 }, 'test')).toBe(
        false,
      );
    });
  });

  describe('should work with config Iterable items in config', () => {
    it("when value under path don't change", () => {
      let path = ['a', 'b'];
      let prev = { a: { b: 10 }, x: 0 };
      expect(check([path], prev, { ...prev, x: 10 }, 'test')).toBe(true);
      expect(check([path], prev, { a: prev.a }, 'test')).toBe(true);
      expect(
        check(
          [path],
          { i: fromJS(prev) },
          { i: fromJS({ a: { b: 10 } }) },
          'test',
        ),
      ).toBe(true);
    });

    it('when value under path do change', () => {
      let path = ['a', 'b'];
      let prev = { a: { b: 10 }, x: 0 };
      expect(
        check([path], prev, { a: { ...prev.a, b: 0 }, x: 0 }, 'test'),
      ).toBe(false);
      expect(
        check(
          [path],
          { a: fromJS(prev.a), x: 0 },
          { a: fromJS({ b: 0 }), x: 0 },
          'test',
        ),
      ).toBe(false);
    });

    it('when value under path does not exists', () => {
      let path = ['a', 'b'];
      let prev = { a: {}, x: 0 };
      expect(check([path], prev, prev, 'test')).toBe(true);
      expect(check([path], prev, {}, 'test')).toBe(true);
    });

    it('when item is empty Iterator like []', () => {
      let prev = { a: 10, b: 11 };
      expect(check([[]], prev, { ...prev }, 'test')).toBe(
        false,
        'different prev,next instances',
      );
      expect(check([[]], prev, prev, 'test')).toBe(
        true,
        'same prev,next instances',
      );
    });
  });
});
