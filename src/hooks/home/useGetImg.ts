import { useCallback } from 'react';

const useFileInput = (setImage: (file: File | null) => void) => {
  return useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0] || null; // 파일 또는 null
      if (file) {
        setImage(file);
      }
    },
    [setImage]
  );
};

export default useFileInput;
