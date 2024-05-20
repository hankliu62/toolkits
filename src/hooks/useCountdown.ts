import { useEffect, useRef, useState } from 'react';

const useCountdown = (countdownNumber: number, ms: number = 1000, onEnd: () => void = () => {}) => {
  const [count, setCount] = useState<number>(countdownNumber);
  // 上一次执行的时间点
  const lastTime = useRef<number>(Date.now());
  // 下一次需要执行的时间
  const nextTimeMs = useRef<number>(ms);

  const timer = useRef<number>();

  const clearTime = () => {
    timer.current && clearInterval(timer.current);
  };

  const startCountdown = () => {
    const now = Date.now();
    // 计算出实际执行的时间
    const executionTime = now - lastTime.current;

    // 实际执行时间大于上一次需要执行的时间，说明执行时间多了，否则需要补上差的时间
    const diffTime = executionTime - nextTimeMs.current;

    // 下一次需要执行的时间
    nextTimeMs.current = ms - diffTime;
    // 记录上一次执行时间点
    lastTime.current = now;

    setCount((prev) => {
      const nextCount = prev - 1;

      return nextCount > 0 ? nextCount : 0;
    });

    timer.current = setTimeout(startCountdown, nextTimeMs.current) as unknown as number;
  };

  useEffect(() => {
    clearTime();
    setCount(countdownNumber);

    timer.current = setTimeout(startCountdown, ms) as unknown as number;

    return () => {
      clearTime();
    };
  }, [countdownNumber]);

  useEffect(() => {
    if (count <= 0) {
      clearTime();
      onEnd();
    }
  }, [count]);

  return count;
};

export default useCountdown;
