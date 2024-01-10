import miniget from 'miniget';
import type { RequestOptions } from 'http';

/**
 * Extract json after given string.
 * loosely based on utils#between
 *
 * @param {string} haystack
 * @param {string} left
 * @returns {Object|null} the parsed json or null
 */
export const jsonAfter = (haystack: string, left: string): object | null => {
  const pos = haystack.indexOf(left);
  if (pos === -1) {
    return null;
  }
  haystack = haystack.slice(pos + left.length);
  try {
    return JSON.parse(cutAfterJSON(haystack));
  } catch (e) {
    return null;
  }
};

/**
 * Match begin and end braces of input JSON, return only json
 * Property of https://github.com/fent/node-ytdl-core/blob/master/lib/utils.js
 *
 * @param {string} mixedJson
 * @returns {string}
 * @throws {Error} no json or invalid json
 */
export const cutAfterJSON = (mixedJson: string): string => {
  let open, close;
  if (mixedJson[0] === '[') {
    open = '[';
    close = ']';
  } else if (mixedJson[0] === '{') {
    open = '{';
    close = '}';
  }

  if (!open) {
    throw new Error(`Can't cut unsupported JSON (need to begin with [ or { ) but got: ${mixedJson[0]}`);
  }

  // States if the loop is currently in a string
  let isString = false;

  // Current open brackets to be closed
  let counter = 0;

  let i;
  for (i = 0; i < mixedJson.length; i++) {
    // Toggle the isString boolean when leaving/entering string
    if (mixedJson[i] === '"' && mixedJson[i - 1] !== '\\') {
      isString = !isString;
      continue;
    }
    if (isString) continue;

    if (mixedJson[i] === open) {
      counter++;
    } else if (mixedJson[i] === close) {
      counter--;
    }

    // All brackets have been closed, thus end of JSON is reached
    if (counter === 0) {
      // Return the cut JSON
      return mixedJson.substr(0, i + 1);
    }
  }

  // We ran through the whole string and ended up with an unclosed bracket
  throw Error("Can't cut unsupported JSON (no matching closing bracket found)");
};

/**
 * Extract string inbetween another.
 * Property of https://github.com/fent/node-ytdl-core/blob/master/lib/utils.js
 *
 * @param {string} haystack
 * @param {string} left
 * @param {string} right
 * @returns {string}
 */
export const between = (haystack: string, left: string, right: string): string => {
  let pos;
  pos = haystack.indexOf(left);
  if (pos === -1) {
    return '';
  }
  pos += left.length;
  haystack = haystack.slice(pos);
  pos = haystack.indexOf(right);
  if (pos === -1) {
    return '';
  }
  haystack = haystack.slice(0, pos);
  return haystack;
};

// Request Utility to make post request
export const doPost = async (url: string, payload: object, reqOpts: RequestOptions = {}): Promise<string> => {
  // Enforce POST-Request
  reqOpts.method = 'POST';
  const req = miniget(url, reqOpts);
  // Write request body
  if (payload) req.once('request', (r) => r.write(JSON.stringify(payload)));

  // Await response-text and parse json
  return await req.text();
};

// Convert Subscribers to number
export const subsToBigInt = (count: string): bigint => {
  const num = BigInt(count.replace(RegExp('[^0-9.]', 'g'), ''));
  const unit = count.replace(' subscribers', '').replace(RegExp('[0-9.]', 'g'), '').trim().toLowerCase();
  switch (unit) {
    case '':
      return num;
    case 'k':
      return num * BigInt(1000);
    case 'm':
      return num * BigInt(1000000);
    case 'b':
      return num * BigInt(1000000000);
    case 't':
      return num * BigInt(1000000000000);
    default:
      console.error(`unknown unit ${unit} found in num: ${count}`);
      return BigInt(num);
  }
};
