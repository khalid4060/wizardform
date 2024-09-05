// import {math as mexp} from 'mathjs/dist/math.min';
import shuffle from 'shuffle-array';
import mexp from 'math-expression-evaluator';
import { store } from '@store';


function stripTashkeel(input) {
  const specialCharCode = [
    1611, // FATHATAN
    1612, // DAMMATAN
    1613, // KASRATAN
    1614, // FATHA
    1615, // DAMMA
    1616, // KASRA
    1617, // CHARCODE_SHADDA
    1618, // CHARCODE_SUKOON
  ];
  let output = '';
  for (let i = 0; i < input.length; i++) {
    const letter = input.charAt(i);
    let charCode = letter.charCodeAt(0);
    if (specialCharCode.indexOf(charCode) <= -1) {
      output += letter;
    }
  }

  return output;
}

function replaceTag(tag) {
  const tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  };
  return tagsToReplace[tag] || tag;
}

export const generateId = () => {
  let result = '';
  const length = 9;
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};


export const intToFloat = (num) => {
  let newNum = num;
  if (newNum % 1 == 0) {
    newNum += 0.00001;
  }
  if (Number.isNaN(newNum) || typeof newNum != 'number') {
    newNum = 0.00001;
  }
  return newNum;
};

export const sendBigData = (componentData) => {
  if (componentData) {
    let data = {
      type: 'BEH_EVENT',
      value: {
        header: {
          eventType: 'content.completed', //????
        },
        body: {
          action: componentData.action, //???
          object: {
            id: componentData.id, //>>>>
            type: 'experience', //????
            name: componentData.name, //???
          },
        },
        context: {
          ...componentData.context,
        },
      },
    };
    try {
      window.parent.postMessage(data, '*');
    } catch (error) {
      console.log(error);
    }
  }
};

export const getWordTranslate = (key, pageDirection) => {
  let { lesson, translation } = store.getState();
  let text = key;
  let direction = lesson.page_direction;

  if (pageDirection) {
    direction = pageDirection;
  }

  let lang = 'en';
  if (direction == 'rtl') {
    lang = 'ar';
  } else {
    lang = 'en';
  }

  let wordList = translation.data;

  if (wordList[key]) {
    text = wordList[key][lang];
  }

  return text;
};

export const openFullscreen = () => {
  let elemRef = document.documentElement;
  if (elemRef.requestFullscreen) {
    try {
      elemRef.requestFullscreen();
    } catch (error) {}
  } else if (elemRef.webkitRequestFullscreen) {
    /* Safari */
    try {
      elemRef.webkitRequestFullscreen(); 
    } catch (error) {}
  } else if (elemRef.msRequestFullscreen) {
    /* IE11 */
    try {
      elemRef.msRequestFullscreen();
    } catch (error) {}
  }
};

export const closeFullscreen = () => {
  if (document.exitFullscreen) {
    try {
      document.exitFullscreen();
    } catch (error) {}
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    try {
      document.webkitExitFullscreen();
    } catch (error) {}
  } else if (document.msExitFullscreen) {
    /* IE11 */
    try {
      document.msExitFullscreen();
    } catch (error) {}
  }
};

export const stripHtmlTags = (str) =>{
  let cleanStr = str.replace(/<\/?[^>]+>/gi, '');

  // Remove &nbsp; and other entities like &amp;, &lt;, &gt;, etc.
  cleanStr = cleanStr.replace(/&[a-z]+;/gi, '');

  // Remove extra whitespace
  cleanStr = cleanStr.replace(/\s+/g, ' ').trim();

  return cleanStr;
}