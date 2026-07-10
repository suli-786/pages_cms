'use client';

import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'banner-dismissed';
const BANNER_EVENT = 'banner-dismissed';

const checkBannerDismissed = () => {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

export const useBannerVisibility = (initialVisible = true) => {
  const subscribe = (callback: () => void) => {
    window.addEventListener(BANNER_EVENT, callback);
    return () => {
      window.removeEventListener(BANNER_EVENT, callback);
    };
  };

  const getSnapshot = () => {
    return checkBannerDismissed() ? false : initialVisible;
  };

  const getServerSnapshot = () => {
    return initialVisible;
  };

  const isBannerVisible = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const dismissBanner = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore write errors (private mode, etc.)
    }
    window.dispatchEvent(new Event(BANNER_EVENT));
  };

  return { isBannerVisible, dismissBanner };
};
