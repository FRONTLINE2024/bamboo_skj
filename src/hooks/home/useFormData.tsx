import { useMemo } from 'react';

export interface FormDataType {
  [key: string]: string | File | null; // 키는 문자열, 값은 문자열 또는 파일
}

const useFormData = (data: FormDataType) => {
  return useMemo(() => {
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== null) {
        formData.append(key, `${data[key]}`); // null 체크 후 FormData에 추가
      }
    }

    console.log('useFormData:', data);
    return formData; // FormData 객체 반환
  }, [data]);
};

export default useFormData;
