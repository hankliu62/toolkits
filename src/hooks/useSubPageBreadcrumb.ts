import { useRouter } from "next/router";
import { useEffect } from "react";

function useSubPageBreadcrumb() {
  const router = useRouter();

  const messageHandler = (event: MessageEvent) => {
    if (event.origin === window.location.origin) {
      try {
        if (
          event.data &&
          event.data !== "undefined" &&
          Object.prototype.toString.call(event.data).slice(8, -1) === "Object"
        ) {
          const data = event.data;
          // console.log("receive message", data);
          switch (data.type) {
            case "homepage": {
              const properties = data.data || {};
              const href = properties.href;
              const query = properties.query || {};
              if (href) {
                window.location.href = href;
              } else {
                router.push({
                  pathname: "/",
                  query: {
                    ...router.query,
                    ...query,
                  },
                });
              }
              break;
            }
            default: {
              console.warn("operation not support", data);
            }
          }
        }
      } catch (error) {
        console.error(
          `parse message failed ${error.message ? ", " : ""}${
            error.message || ""
          }`
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);
}

export default useSubPageBreadcrumb;
