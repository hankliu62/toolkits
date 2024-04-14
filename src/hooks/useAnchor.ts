import { useCallback, useEffect, useState } from "react";

export default function useAnchor(
  menus: { id: string | number; title: string }[]
) {
  const [currentSection, setCurrentSection] = useState(
    menus[0]?.id || menus[0]?.title
  );

  const getHeadings = useCallback((menus) => {
    // .flatMap((node) => [
    //   node.id,
    //   ...node.children.map((child) => child.id),
    // ])
    return menus.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const style = window.getComputedStyle(el);
      const scrollMt = Number.parseFloat(style.scrollMarginTop);

      const top = window.scrollY + el.getBoundingClientRect().top - scrollMt;
      return { id, top };
    });
  }, []);

  useEffect(() => {
    if (menus.length === 0) return;
    let headings = getHeadings(menus);
    function onScroll() {
      if (headings.filter(Boolean).length !== menus.length) {
        headings = getHeadings(menus);
      }

      if (headings.filter(Boolean).length === 0) return;

      const top = window.scrollY;
      let current = headings[0].id;
      for (const heading of headings) {
        if (heading && top >= heading.top) {
          current = heading.id;
        } else {
          break;
        }
      }
      setCurrentSection(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true } as any);
    };
  }, [getHeadings, menus]);

  return currentSection;
}
