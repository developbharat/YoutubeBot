import t from 'tap';
import { Version } from './index.js';

t.test('Version response should follow format MAJOR.MINOR.PATCH', (t) => {
  t.match(Version(), /^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}$/);
  t.end();
});
