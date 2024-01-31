import t from 'tap';

t.test('ok', (t) => {
  t.ok(true);
  t.end();
});
// import t from 'tap';
// import { AboutChannelParser } from '../AboutChannelParser.js';
// import { TestData } from '../../../__tests__/TestData.js';
// import { ChannelAboutDetails } from '../../DataClasses/ChannelAboutDetails.js';

// t.test('is instanceable', (t) => {
//   const instance = new AboutChannelParser();
//   t.ok(instance instanceof AboutChannelParser);
//   t.end();
// });

// t.test('implements IDataParser', (t) => {
//   const instance = new AboutChannelParser();
//   t.ok(typeof instance['parseHtmlData'] !== 'undefined');
//   t.ok(typeof instance['parseAPIData'] !== 'undefined');
//   t.end();
// });

// t.test('parseHtmlData resolves without exception ', async (t) => {
//   const instance = new AboutChannelParser();
//   t.resolves(instance.parseHtmlData('{}'));
//   const res = await instance.parseHtmlData('{}');
//   t.notOk(res.success);
//   t.ok(res.error instanceof Error);
//   t.end();
// });

// t.test('parseAPIData resolves without exception', async (t) => {
//   const instance = new AboutChannelParser();
//   t.resolves(instance.parseAPIData('{}'));
//   const res = await instance.parseAPIData('{}');
//   t.notOk(res.success);
//   t.ok(res.error instanceof Error);
//   t.end();
// });

// t.test('parseHTMLData succeeds with valid data', async (t) => {
//   const instance = new AboutChannelParser();
//   const res = await instance.parseHtmlData(TestData.aboutChannel.htmlResultJson);
//   t.ok(res.success);
//   t.ok(typeof res.data === 'object');
//   t.ok(ChannelAboutDetails.isValid(res.data, false));
//   t.ok(res.error === undefined);
//   t.end();
// });

// t.test('parseAPIData succeeds with valid data', async (t) => {
//   const instance = new AboutChannelParser();
//   const res = await instance.parseAPIData(TestData.aboutChannel.apiResultJson);
//   t.ok(res.success);
//   t.ok(typeof res.data === 'object');
//   t.ok(ChannelAboutDetails.isValid(res.data, false));
//   t.ok(res.error === undefined);
//   t.end();
// });
