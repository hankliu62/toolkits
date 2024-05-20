// 定义移动设备最大宽度
const MOBILE_MAX_WIDTH = 1023;

/**
 * 是否为浏览器环境
 */
export function isBrowser() {
  return (
    typeof window !== 'undefined' &&
    window.document !== undefined &&
    window.document.createElement !== undefined
  );
}

declare global {
  interface Document {
    mozFullScreenEnabled: any;
    msFullscreenEnabled: any;
    webkitSupportsFullscreen: any;
    webkitFullscreenEnabled: any;
    fullScreen: any;
    webkitIsFullScreen: any;
    mozFullScreen: any;
    msFullscreenElement: any;
    fullscreenElement: any;
    mozCancelFullScreen: any;
    webkitCancelFullScreen: any;
    msExitFullscreen: any;
  }
}

/**
 * 是否全屏
 */
export function isFullScreen() {
  if (!isBrowser()) return false;
  if (typeof document !== 'object') return false;
  return !!(
    document.fullScreen ||
    document.webkitIsFullScreen ||
    document.mozFullScreen ||
    document.msFullscreenElement ||
    document.fullscreenElement
  );
}

/**
 * 是否为Safari浏览器
 */
export function isSafari(): boolean {
  if (!isBrowser()) return false;

  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome/.test(ua);
}

/**
 * 是否为IE浏览器
 */
export function isIE(): boolean {
  if (typeof window !== 'object') return false;
  return 'ActiveXObject' in window;
}

/**
 * 是否为IOS系统
 */
export function isiOS(): boolean {
  if (!isBrowser()) return false;

  return !!/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(navigator.userAgent);
}

// 检测当前环境是否为手机端
export function isMobile(): boolean {
  if (!isBrowser()) return false;

  const userAgent = navigator.userAgent;
  return (
    /(ipad|ipod|mobile|android|iphone|windows phone)/gi.test(userAgent) &&
    /mobile/gi.test(userAgent)
  );
}

/**
 * 获得浏览器文档宽度
 */
export function getDocumentWidth(): number {
  if (!isBrowser()) return 0;

  return document?.documentElement?.clientWidth || window.innerWidth || document.body.clientWidth;
}

/**
 * 根据页面宽度判断当时是否为移动设备
 * @returns true || false
 */
export function isMobilePage() {
  return isMobile() || getDocumentWidth() <= MOBILE_MAX_WIDTH;
}
