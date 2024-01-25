import t from 'tap';
import { HttpRequestMaker } from '../HttpRequestMaker.js';
import { TestData } from '../../__tests__/TestData.js';

t.test('is instanceable', (t) => {
  const instance = new HttpRequestMaker();
  t.ok(instance instanceof HttpRequestMaker);
  t.end();
});

t.test('implements IRequestMaker', (t) => {
  const instance = new HttpRequestMaker();
  t.ok(typeof instance['makeAPIRequest'] !== 'undefined');
  t.ok(typeof instance['makeHTMLRequest'] !== 'undefined');
  t.end();
});

t.test('makeHTMLRequest resolves without exception', async (t) => {
  const instance = new HttpRequestMaker();
  t.resolves(instance.makeHTMLRequest({ url: 'invalid url' }));
  const res = await instance.makeHTMLRequest({ url: 'invalid url' });
  t.notOk(res.success);
  t.ok(res.error instanceof Error);
  t.end();
});

t.test('makeAPIRequest resolves without exception', async (t) => {
  const instance = new HttpRequestMaker();
  const invalidData = { url: 'invalid url' } as any;
  t.resolves(instance.makeAPIRequest(invalidData));
  const res = await instance.makeAPIRequest(invalidData);
  t.notOk(res.success);
  t.ok(res.error instanceof Error);
  t.end();
});

t.test('makeHTMLRequest succeeds with data', async (t) => {
  const instance = new HttpRequestMaker();
  t.resolves(instance.makeHTMLRequest({ url: TestData.aboutChannel.metadata.canonicalUrl }));
  const res = await instance.makeHTMLRequest({ url: TestData.aboutChannel.metadata.canonicalUrl });
  t.ok(res.success);
  t.ok(typeof res.data === 'string');
  t.ok(res.data.includes('</html>'));
  t.ok(res.error === null);
  t.end();
});
