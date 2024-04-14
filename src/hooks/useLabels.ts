import React, { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function useLabels() {
  const { data: labels, mutate } = useSWR<any[]>("/api/labels", fetcher, {
    fallbackData: [],
  });

  return { labels };
}
