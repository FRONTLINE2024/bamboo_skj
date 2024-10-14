import { useMemo } from 'react';

export interface FormDataType {
  [key: string]: string | File | null;
}

const useFormData = (data: FormDataType) => {
  return useMemo(() => {
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== null) {
        if (key === 'board_img') {
          if (data.board_img) {
            formData.append(key, data.board_img);
          }
        } else {
          formData.append(key, `${data[key]}`);
        }
      }
    }

    console.log('useFormData:', data);
    return formData;
  }, [data]);
};

export default useFormData;
