import { UAParser } from 'ua-parser-js';

export const getDeviceType = () => {
  const parser = new UAParser();
  const device = parser.getDevice();
  const os = parser.getOS();

  if (device.type === 'mobile' || device.type === 'tablet') {
    if (os.name?.toLowerCase().includes('android')) return 'android';
    if (os.name?.toLowerCase().includes('ios')) return 'ios';
    return 'android';
  }

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
