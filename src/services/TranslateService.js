import { GOOGLE_TRANSLATE_API_KEY } from '@env';

export const translateText = async (text, targetLanguage) => {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
        }),
      }
    );
    // ادامه منطق...
  } catch (error) {
    console.error("Translation Error:", error);
    return text;
  }
};

    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation Error:", error);
    return text; // در صورت خطا، همان متن اصلی را برگردان
  }
};
