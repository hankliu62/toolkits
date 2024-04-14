import { DependencyList, useEffect } from "react";

function useAsyncEffect(effect: () => Promise<any>, deps?: DependencyList) {
  useEffect(() => {
    effect();
  }, deps);
}

export default useAsyncEffect;
