import { useRef, useState, useEffect } from "react";

export function usePending() {
  const [pendingCount, setPendingCount] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const pendingRef = useRef(0);
  const timerRef = useRef();

  const increment = () => {
    pendingRef.current += 1;
    setPendingCount(pendingRef.current);
  };

  const decrement = () => {
    pendingRef.current = Math.max(0, pendingRef.current - 1);
    setPendingCount(pendingRef.current);
  };

  const call = async (promise) => {
    increment();
    try {
      return promise;
    } finally {
      decrement();
    }
  };

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (pendingRef.current > 0) {
      timerRef.current = setTimeout(() => {
        if (!isPending) setIsPending(true);

        const checkPending = () => {
          if (pendingRef.current > 0) {
            if (!isPending) setIsPending(true);
            timerRef.current = setTimeout(checkPending, 1000);
          } else {
            if (isPending) setIsPending(false);
          }
        };

        timerRef.current = setTimeout(checkPending, 1000);
      }, 150);
    } else {
      if (isPending)
        timerRef.current = setTimeout(() => setIsPending(false), 800);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPending, pendingCount]);

  return { call, isPending };
}
