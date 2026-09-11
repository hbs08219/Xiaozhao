import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { ChoiceMap, Status } from './types';

const STORAGE_KEY = 'wedding-prep:choices:v1';
const EXPORT_VERSION = 1;

function loadChoices(): ChoiceMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as ChoiceMap) : {};
  } catch {
    return {};
  }
}

interface StoreValue {
  choices: ChoiceMap;
  get: (key: string) => ChoiceMap[string] | undefined;
  setStatus: (key: string, status: Status) => void;
  setComment: (key: string, comment: string) => void;
  clearKey: (key: string) => void;
  exportJson: () => void;
  importJson: (text: string) => { merged: number; skipped: number };
  resetAll: () => void;
  lastUpdated: number | null;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [choices, setChoices] = useState<ChoiceMap>(loadChoices);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(choices));
    } catch {
      /* 隐私模式下可能写不进去，忽略即可 */
    }
  }, [choices]);

  const patch = useCallback((key: string, data: Partial<ChoiceMap[string]>) => {
    setChoices((prev) => {
      const current = prev[key] ?? { status: 'candidate' as Status };
      return { ...prev, [key]: { ...current, ...data, updatedAt: Date.now() } };
    });
  }, []);

  const setStatus = useCallback((key: string, status: Status) => {
    setChoices((prev) => {
      const current = prev[key];
      const next: Status = current?.status === status ? 'candidate' : status;
      if (!current && next === 'candidate') return prev;
      return { ...prev, [key]: { ...current, status: next, updatedAt: Date.now() } };
    });
  }, []);

  const setComment = useCallback(
    (key: string, comment: string) => patch(key, { comment }),
    [patch],
  );

  const clearKey = useCallback((key: string) => {
    setChoices((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    if (confirm('确定清空本机所有勾选和备注吗？此操作不可撤销。')) setChoices({});
  }, []);

  const exportJson = useCallback(() => {
    const payload = {
      app: 'wedding-prep',
      version: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      choices,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const now = new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    a.href = url;
    a.download = `备婚进度_${now.getFullYear()}${p(now.getMonth() + 1)}${p(now.getDate())}_${p(now.getHours())}${p(now.getMinutes())}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [choices]);

  const importJson = useCallback((text: string) => {
    let payload: { app?: string; choices?: Record<string, unknown> };
    try {
      payload = JSON.parse(text);
    } catch {
      throw new Error('不是合法的 JSON 文件');
    }
    if (payload?.app !== 'wedding-prep' || !payload.choices) {
      throw new Error('这不是备婚手册导出的文件');
    }
    let merged = 0;
    let skipped = 0;
    setChoices((prev) => {
      const next = { ...prev };
      for (const [key, incoming] of Object.entries(payload.choices ?? {})) {
        if (!incoming || typeof incoming !== 'object') continue;
        const inc = incoming as ChoiceMap[string];
        const local = next[key];
        const incAt = inc.updatedAt ?? 0;
        const localAt = local?.updatedAt ?? 0;
        if (local) {
          if (incAt > localAt) {
            next[key] = inc;
            merged++;
          } else {
            skipped++;
          }
        } else {
          next[key] = inc;
          merged++;
        }
      }
      return next;
    });
    return { merged, skipped };
  }, []);

  const lastUpdated = useMemo(() => {
    let latest: number | null = null;
    for (const c of Object.values(choices)) {
      if (c.updatedAt && (latest === null || c.updatedAt > latest)) latest = c.updatedAt;
    }
    return latest;
  }, [choices]);

  const value = useMemo<StoreValue>(
    () => ({ choices, get: (key) => choices[key], setStatus, setComment, clearKey, exportJson, importJson, resetAll, lastUpdated }),
    [choices, setStatus, setComment, clearKey, exportJson, importJson, resetAll, lastUpdated],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore 必须在 StoreProvider 内使用');
  return ctx;
}
