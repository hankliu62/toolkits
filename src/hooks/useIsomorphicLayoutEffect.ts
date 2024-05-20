import { useEffect, useLayoutEffect } from 'react';

/**
 * 同构Effect函数
 */
export const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;
