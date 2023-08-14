import crypto from "crypto";
const CODE = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

function toAcceptKey(wsKey) {
  return crypto
    .createHash("sha1")
    .update(wsKey + CODE)
    .digest("base64");
}

// 掩码
function unMask(buffers, mask) {
  for (let index = 0; index < buffers.length; index++) {
    // 掩码有点像切砖款
    // 原来内容：  'bc cd ee aa d1 b1 c3 ee aa df ff'  掩码内容：'ab c2 d2 dd'
    /**
     *    bc cd ee aa d1 b1 c3 ee aa df ff
     *    ab c2 d2 dd ab c2 d2 dd ab c2 d2 dd // 掩码 反复取用
     */
    buffers[index] ^= mask[index % 4]; // 掩码4个字节
  }
}

// 处理headers
function analyseHeaders(rows) {
  const headers = rows.reduce((prev, time) => {
    const [key, value] = time.split(": ");
    prev[key.toLocaleLowerCase()] = value;
    return prev;
  }, {});
  return headers;
}

export { unMask, toAcceptKey, analyseHeaders };
