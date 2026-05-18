import { UAParser } from 'ua-parser-js';

export const getDeviceType = () => {
  const parser = new UAParser();
  const device = parser.getDevice();

  if (device.type === 'mobile') return 'mobile';
  if (device.type === 'tablet') return 'tablet';

  return 'web';
};

export const getDeviceToken = () => {
  let token = localStorage.getItem('deviceToken');

  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem('deviceToken', token);
  }

  return token;
};
