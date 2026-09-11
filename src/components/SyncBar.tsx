import { useRef, useState } from 'react';
import { useStore } from '../store';

export default function SyncBar() {
  const store = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');

  const onFile = async (file: File) => {
    try {
      const text = await file.text();
      const { merged, skipped } = store.importJson(text);
      setMsg(`导入完成：更新 ${merged} 项，跳过 ${skipped} 项（本地更新更晚）`);
    } catch (e) {
      setMsg(`导入失败：${(e as Error).message}`);
    }
    setTimeout(() => setMsg(''), 6000);
  };

  return (
    <div className="syncbar">
      <div className="sync-actions">
        <button type="button" className="btn" onClick={store.exportJson}>
          导出进度
        </button>
        <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
          导入进度
        </button>
        <button type="button" className="btn btn-ghost" onClick={store.resetAll}>
          清空本机
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void onFile(f);
            e.target.value = '';
          }}
        />
      </div>
      <p className="sync-tip">
        {msg || '勾选和备注只存在这台设备上。一方「导出进度」发给另一方「导入」，即可合并两边的最新选择。'}
      </p>
    </div>
  );
}
