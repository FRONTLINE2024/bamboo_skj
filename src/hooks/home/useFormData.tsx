import { useMemo } from 'react';

export interface FormDataType {
  [key: string]: string | File | null;
}

const useFormData = (data: FormDataType) => {
  return useMemo(() => {
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== null) {
        // 'board_img' 키일 경우 확인
        if (key === 'board_img') {
          // board_img가 null이 아닌 경우에만 formData에 추가
          if (data.board_img) {
            formData.append(key, data.board_img);
          }
        } else {
          // 다른 키들은 null이 아니면 formData에 추가
          formData.append(key, `${data[key]}`);
        }
      }
    }

    console.log('useFormData:', data);
    return formData;
  }, [data]);
};

export default useFormData;
