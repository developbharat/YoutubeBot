import t from 'tap';

t.test('ok', (t) => {
  t.ok(true);
  t.end();
});
// import t from 'tap';
// import { AboutChannelProtocol, PlaylistArrayProtocol } from './index.js';

// t.test('index file must export AboutChannelProtocol', (t) => {
//   const instance = new AboutChannelProtocol({ channelId: 'UC_xxxxxxxxxxxxxxxx' });
//   t.ok(instance instanceof AboutChannelProtocol);
//   t.end();
// });

// t.test('index file must export PlaylistArrayProtocol', (t) => {
//   const instance = new PlaylistArrayProtocol({ channelId: 'UC_xxxxxxxxxxxxxxxx' });
//   t.ok(instance instanceof PlaylistArrayProtocol);
//   t.end();
// });
