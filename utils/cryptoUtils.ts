import CryptoJS from 'crypto-js';

// 암호화 키
const SECRET_KEY = process.env.NEXT_PUBLIC_AES_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY가 설정되지 않았습니다!');
}

const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);

// 비밀번호 암호화
export const encrypt = (pwd: string) => {
  try {
    // 랜덤 IV 생성
    const iv = CryptoJS.lib.WordArray.random(16);

    const cipher = CryptoJS.AES.encrypt(pwd, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });

    return iv.toString(CryptoJS.enc.Hex) + ':' + cipher.toString();
  } catch (e) {
    console.error('Encryption error occur: ', e);
    return null;
  }
};
