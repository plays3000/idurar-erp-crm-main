import lang from './translation/ko_kr';

const getLabel = (key) => {
  try {
    // 키값을 소문자 및 언더바 형식으로 변환 (예: "Customer Name" -> "customer_name")
    const lowerCaseKey = key
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/ /g, '_');

    // 2. 중요: 한국어 번역 파일에 해당 키가 있으면 그 값을 즉시 반환!
    if (lang && lang[lowerCaseKey]) {
      return lang[lowerCaseKey];
    }

    // --- 만약 번역이 없을 경우 실행되는 기존 로직 (영어 자동 생성) ---
    const remove_underscore_fromKey = key.replace(/_/g, ' ').split(' ');
    const conversionOfAllFirstCharacterofEachWord = remove_underscore_fromKey.map(
      (word) => (word[0] ? word[0].toUpperCase() + word.substring(1) : '')
    );

    const label = conversionOfAllFirstCharacterofEachWord.join(' ');
    
    // 로컬스토리지 저장 로직 (생략 가능하나 유지)
    const result = window.localStorage.getItem('lang');
    let list = result ? JSON.parse(result) : {};
    list[lowerCaseKey] = label;
    window.localStorage.setItem('lang', JSON.stringify(list));

    return label; // 번역이 없으면 결국 영어가 나옴
  } catch (error) {
    return key; // 에러 시 키값이라도 출력
  }
};

const useLanguage = () => {
  const translate = (value) => getLabel(value);
  return translate;
};

// const getLabel = (key) => {
//   try {
//     const lowerCaseKey = key
//       .toLowerCase()
//       .replace(/[^a-zA-Z0-9]/g, '_')
//       .replace(/ /g, '_');

//     // if (lang[lowerCaseKey]) return lang[lowerCaseKey];

//     // convert no found language label key to label

//     const remove_underscore_fromKey = key.replace(/_/g, ' ').split(' ');

//     const conversionOfAllFirstCharacterofEachWord = remove_underscore_fromKey.map(
//       (word) => word[0].toUpperCase() + word.substring(1)
//     );

//     const label = conversionOfAllFirstCharacterofEachWord.join(' ');

//     const result = window.localStorage.getItem('lang');
//     if (!result) {
//       let list = {};
//       list[lowerCaseKey] = label;
//       window.localStorage.setItem('lang', JSON.stringify(list));
//     } else {
//       let list = { ...JSON.parse(result) };
//       list[lowerCaseKey] = label;
//       window.localStorage.removeItem('lang');
//       window.localStorage.setItem('lang', JSON.stringify(list));
//     }
//     // console.error(
//     //   '🇩🇿 🇧🇷 🇻🇳 🇮🇩 🇨🇳 Language Label Warning : translate("' +
//     //     lowerCaseKey +
//     //     '") failed to get label for this key : ' +
//     //     lowerCaseKey +
//     //     ' please review your language config file and add this label'
//     // );
//     return label;
//   } catch (error) {
//     // console.error(
//     //   '🚨 error getting this label : translate("' +
//     //     key +
//     //     '") failed to get label for this key : ' +
//     //     key +
//     //     ' please review your language config file and add this label'
//     // );
//     return 'No translate';
//   }
// };

// const useLanguage = () => {
//   const translate = (value) => getLabel(value);

//   return translate;
// };

export default useLanguage;
