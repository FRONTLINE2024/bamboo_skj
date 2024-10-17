import { useMemo, useRef } from 'react';

export interface FormDataType {
  [key: string]: string | File | null;
}

const useFormData = (data: FormDataType) => {
  const previousDataRef = useRef<FormData | null>(null);

  return useMemo(() => {
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== null) {
        if (key === 'board_img') {
          if (data.board_img) {
            formData.append(key, data.board_img as File);
          }
        } else {
          formData.append(key, `${data[key]}`);
        }
      }
    }

    previousDataRef.current = formData;

    return formData;
  }, [data]);
};

export default useFormData;
