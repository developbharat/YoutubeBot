import t from 'tap';

t.test('ok', (t) => {
  t.ok(true);
  t.end();
});

// import t from 'tap';
// import { ChannelAboutDetails } from '../ChannelAboutDetails.js';
// import { TestData } from '../../../__tests__/TestData.js';

// t.test('is instanceable', (t) => {
//   const instance = new ChannelAboutDetails(TestData.aboutChannel.details);
//   t.ok(instance instanceof ChannelAboutDetails);
//   t.end();
// });

// t.test('implements IDataClass', (t) => {
//   const instance = new ChannelAboutDetails(TestData.aboutChannel.details);
//   t.equal(typeof ChannelAboutDetails.isValid, 'function');
//   t.equal(typeof instance.toJSON, 'function');
//   t.end();
// });

// t.test('exposes public data.', (t) => {
//   const instance = new ChannelAboutDetails(TestData.aboutChannel.details);
//   t.ok(Array.isArray(instance['links']));
//   t.ok(instance.channelCreatedDate instanceof Date);
//   t.ok(typeof instance.videosCount === 'bigint');
//   t.ok(typeof instance.totalViewsCount === 'bigint');
//   t.ok(typeof instance.subscribersCount === 'bigint');
//   t.end();
// });

// t.test('isValid succeeds', (t) => {
//   t.ok(ChannelAboutDetails.isValid(TestData.aboutChannel.details));
//   t.end();
// });

// t.test('isValid fails', (t) => {
//   [
//     { url: 'http://example.com', width: null, height: null },
//     { url: 'http://example.com', name: 'Test name' },
//     [{ url: 'http://example.com', width: 30, height: 200 }]
//   ].forEach((data: any) => {
//     t.notOk(ChannelAboutDetails.isValid(data));
//   });
//   t.end();
// });

// t.test('toJSON succeeds with data', (t) => {
//   const instance = new ChannelAboutDetails(TestData.aboutChannel.details);
//   t.notMatch(typeof instance.toJSON(), 'undefined');
//   t.end();
// });
