import t from 'tap';
import { Thumbnail } from '../Thumbnail.js';
import { TestData } from '../../../__tests__/TestData.js';

t.test('is instanceable', (t) => {
  const instance = new Thumbnail(TestData.thumbnail);
  t.ok(instance instanceof Thumbnail);
  t.end();
});

t.test('implements IDataClass', (t) => {
  const instance = new Thumbnail(TestData.thumbnail);
  t.equal(typeof Thumbnail.isValid, 'function');
  t.equal(typeof instance.toJSON, 'function');
  t.end();
});

t.test('exposes public data.', (t) => {
  const instance = new Thumbnail(TestData.thumbnail);
  t.match(typeof instance['url'], 'string');
  t.match(typeof instance['width'], 'number');
  t.match(typeof instance['height'], 'number');
  t.end();
});

t.test('isValid succeeds', (t) => {
  const data = { url: 'http://example.com', width: 20, height: 20 };
  t.ok(Thumbnail.isValid(data));
  t.end();
});

t.test('isValid fails', (t) => {
  [
    { url: 'http://example.com', width: null, height: null },
    { url: 'http://example.com', name: 'Test name' },
    [{ url: 'http://example.com', width: 30, height: 200 }]
  ].forEach((data: any) => {
    t.notOk(Thumbnail.isValid(data));
  });
  t.end();
});

t.test('toJSON succeeds with data', (t) => {
  const instance = new Thumbnail('http://example.com', 50, 60);
  t.notMatch(typeof instance.toJSON(), 'undefined');
  t.end();
});
