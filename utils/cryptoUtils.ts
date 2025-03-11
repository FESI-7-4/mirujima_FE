import CryptoJS from 'crypto-js';

// 암호화 키
const SECRET_KEY = process.env.NEXT_PUBLIC_AES_SECRET_KEY;
const IV = process.env.NEXT_PUBLIC_IV;

if (!SECRET_KEY || !IV) {
  throw new Error('SECRET_KEY 또는 IV가 설정되지 않았습니다!');
}

// 비밀번호 암호화
export const encrypt = (pwd: string) => {
  try {
    const cipher = CryptoJS.AES.encrypt(pwd, CryptoJS.enc.Utf8.parse(SECRET_KEY), {
      iv: CryptoJS.enc.Utf8.parse(IV),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
  } catch (e) {
    console.error('Encryption error occur: ', e);
    return null;
  }
};
