"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const axios_1 = __importDefault(require("axios"));
const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
    console.error("ELEVENLABS_API_KEY environment variable not set");
    process.exit(1);
}
const ELEVENLABS_API = "https://api.elevenlabs.io/v1";
// Language codes for ElevenLabs v3 model
const LANGUAGE_CODE_MAP = {
    de: "de", // German
    en: "en", // English
    tr: "tr", // Turkish
    es: "es", // Spanish (Spain)
    ar: "ar", // Arabic
    zh: "zh", // Chinese (v3 uses "zh" not "zh-cn")
    ru: "ru", // Russian
    pl: "pl", // Polish
    fr: "fr", // French
};
// Voice map: language -> voice_id (using available premium voices from your account)
const VOICE_MAP = {
    de: "coPfQIqaxowKv5u2s2bV", // Johanna – Gentle Medical Customer Care (German)
    en: "EXAVITQu4vr4xnSDxMaL", // Sarah - Mature, Reassuring, Confident (English + multiple languages)
    tr: "TX3LPaxmHKxFdv7VOQHJ", // Liam - Energetic, Social Media Creator (includes Turkish)
    es: "XrExE9yKIg1WjnnlVkGX", // Matilda - Knowledgable, Professional (includes Spanish)
    ar: "EXAVITQu4vr4xnSDxMaL", // Sarah (includes Arabic)
    zh: "bIHbv24MWmeRgasZH58o", // Will - Relaxed Optimist (includes Chinese)
    ru: "nPczCjzI2devNBz1zQrb", // Brian - Deep, Resonant and Comforting (no Russian in list, fallback to English-capable)
    pl: "pFZP5JQG7iQjIQuC4Bku", // Lily - Velvety Actress (includes Polish)
    fr: "CwhRBWXzGAHq8TQ4Fs17", // Roger - Laid-Back, Casual, Resonant (includes French)
};
// Conversation scripts: locale -> scenario -> script
const SCRIPTS = {
    de: {
        restaurant: `Guten Tag, Sie erreichen Sailly von Restaurant Zur Burg. Wie kann ich Ihnen heute helfen?
[Pause]
Ich möchte gerne einen Tisch reservieren für nächsten Samstag, den 20. März, um 19:00 Uhr.
[Pause]
Sehr gerne. Für wie viele Personen möchte ich einen Tisch reservieren?
[Pause]
Für vier Personen, bitte.
[Pause]
Perfekt. Unter welchem Namen soll ich die Reservierung vornehmen?
[Pause]
Unter Mueller.
[Pause]
Vielen Dank, Herr Mueller. Ihre Reservierung für vier Personen am Samstag, 20. März um 19:00 Uhr ist bestätigt. Wir freuen uns auf Ihren Besuch!`,
        hotel: `Guten Tag, Willkommen bei Hotel Panorama. Wie kann ich Ihnen behilflich sein?
[Pause]
Ich hätte gerne ein Zimmer für den 1. Mai bis 3. Mai, für zwei Personen.
[Pause]
Sehr gerne. Wir haben noch schöne Zimmer verfügbar. Möchten Sie ein Standard- oder ein Deluxe-Zimmer?
[Pause]
Ein Deluxe-Zimmer, bitte.
[Pause]
Ausgezeichnet. Unter welchem Namen soll ich die Reservierung machen?
[Pause]
Schmidt.
[Pause]
Danke, Herr Schmidt. Ihre Buchung für zwei Nächte ist bestätigt: 1. bis 3. Mai, Deluxe-Zimmer für zwei Personen. Sie erhalten eine Bestätigungsmail.`,
    },
    en: {
        restaurant: `Good day, thank you for calling The Olive Grove Restaurant. How can I help you?
[Pause]
I'd like to make a reservation for this Saturday, the 20th of March, at 7 PM.
[Pause]
Of course. How many guests will be dining with us?
[Pause]
Four people, please.
[Pause]
Perfect. May I have your name for the reservation?
[Pause]
It's Thompson.
[Pause]
Thank you, Mr. Thompson. Your reservation for four guests on Saturday, March 20th at 7 PM is confirmed. We look forward to seeing you!`,
        hotel: `Welcome to Sunset Beach Hotel. Good morning. How may I assist you?
[Pause]
I need a room for May 1st to May 3rd, for two guests.
[Pause]
Excellent. We have several options available. Would you prefer a standard or deluxe room?
[Pause]
I'll take a deluxe room, please.
[Pause]
Great choice. What name should I put this reservation under?
[Pause]
Johnson.
[Pause]
Perfect, Mr. Johnson. Your booking is confirmed: May 1st to 3rd, deluxe room for two guests. A confirmation email will be sent to you shortly.`,
    },
    tr: {
        restaurant: `Merhaba, Lezzet Bahçesi Restoranına hoş geldiniz. Sizin için nasıl yardımcı olabilirim?
[Pause]
Bu cumartesi, 20 Mart'ta saat 19:00 için bir masa ayırtmak istiyorum.
[Pause]
Tabii ki. Kaç kişi için masa ayırtmak istiyorsunuz?
[Pause]
Dört kişi için, lütfen.
[Pause]
Mükemmel. Ayırma işlemini hangi ad altında yapayım?
[Pause]
Yılmaz.
[Pause]
Teşekkür ederim, Bayan Yılmaz. Cumartesi, 20 Mart'ta saat 19:00 için dört kişilik masanız rezerve edilmiştir. Sizi bekliyoruz!`,
        hotel: `Merhaba, Güneş Sahil Oteline hoş geldiniz. Nasıl yardımcı olabilirim?
[Pause]
1 Mayıs'tan 3 Mayıs'a kadar iki kişi için bir oda istiyorum.
[Pause]
Elbette. Birkaç seçeneğimiz var. Standart ya da lüks oda tercih edersiniz?
[Pause]
Lüks bir oda, lütfen.
[Pause]
Harika seçim. Bu rezervasyonu hangi ad altında yapayım?
[Pause]
Aksoy.
[Pause]
Mükemmel, Bayan Aksoy. Rezervasyonunuz onaylandı: 1-3 Mayıs, iki kişi için lüks oda. Size onay e-postası gönderilecektir.`,
    },
    es: {
        restaurant: `Buenos días, gracias por llamar al Restaurante El Olivar. ¿Cómo puedo ayudarle?
[Pause]
Me gustaría hacer una reserva para este sábado, 20 de marzo, a las 19:00.
[Pause]
Por supuesto. ¿Para cuántas personas?
[Pause]
Para cuatro personas, por favor.
[Pause]
Perfecto. ¿A qué nombre debo registrar la reserva?
[Pause]
García.
[Pause]
Gracias, Señor García. Su reserva para cuatro personas el sábado 20 de marzo a las 19:00 está confirmada. ¡Le esperamos!`,
        hotel: `Bienvenido al Hotel Playa del Sol. Buenos días. ¿En qué puedo ayudarle?
[Pause]
Necesito una habitación del 1 al 3 de mayo para dos personas.
[Pause]
Excelente. Tenemos varias opciones disponibles. ¿Prefiere una habitación estándar o de lujo?
[Pause]
Una habitación de lujo, por favor.
[Pause]
Muy bien. ¿A qué nombre debo registrar la reserva?
[Pause]
Rodríguez.
[Pause]
Perfecto, Señor Rodríguez. Su reserva está confirmada: 1 al 3 de mayo, habitación de lujo para dos personas. Se enviará un correo de confirmación.`,
    },
    ar: {
        restaurant: `مرحبا، أهلا وسهلا بك في مطعم الزيتون. كيف يمكنني مساعدتك؟
[Pause]
أود حجز طاولة لهذا السبت، 20 مارس، الساعة 19:00.
[Pause]
بالتأكيد. لكم عدد الأشخاص؟
[Pause]
أربعة أشخاص من فضلك.
[Pause]
ممتاز. تحت أي اسم أسجل الحجز؟
[Pause]
محمد.
[Pause]
شكرا لك، السيد محمد. تم تأكيد حجزك لأربعة أشخاص يوم السبت 20 مارس الساعة 19:00. نتطلع لرؤيتك!`,
        hotel: `أهلا وسهلا بك في فندق شاطئ الشمس. صباح الخير. كيف يمكنني مساعدتك؟
[Pause]
أحتاج إلى غرفة من 1 إلى 3 مايو لشخصين.
[Pause]
ممتاز. لدينا عدة خيارات متاحة. هل تفضل غرفة عادية أو فاخرة؟
[Pause]
غرفة فاخرة من فضلك.
[Pause]
اختيار رائع. تحت أي اسم أسجل الحجز؟
[Pause]
علي.
[Pause]
ممتاز، السيد علي. تم تأكيد حجزك: من 1 إلى 3 مايو، غرفة فاخرة لشخصين. سيتم إرسال بريد تأكيد.`,
    },
    zh: {
        restaurant: `您好，欢迎来到橄榄园餐厅。我能为您效劳吗？
[Pause]
我想在这周六，3月20日晚上7点预订一个餐位。
[Pause]
当然可以。请问您要为几位客人预订？
[Pause]
四位，谢谢。
[Pause]
好的。我能取您的名字来登记吗？
[Pause]
王。
[Pause]
感谢您，王先生。您在3月20日周六晚7点为四位客人预订的餐位已确认。我们期待为您服务！`,
        hotel: `欢迎来到阳光沙滩酒店。您好，有什么我可以帮助的吗？
[Pause]
我需要从5月1日到3日的房间，两位客人。
[Pause]
太好了。我们有多个房间选择。您更喜欢标准房还是豪华房？
[Pause]
请给我一个豪华房间。
[Pause]
很好的选择。请问这个预订要登记在什么名字下？
[Pause]
李。
[Pause]
完美，李先生。您的预订已确认：5月1日至3日，为两位客人的豪华房间。我们将发送确认邮件。`,
    },
    ru: {
        restaurant: `Добрый день, спасибо, что позвонили в ресторан "Оливковый сад". Чем я вам помочь?
[Pause]
Я хотел бы зарезервировать столик на эту субботу, 20 марта, на 19:00.
[Pause]
Конечно. На сколько человек зарезервировать столик?
[Pause]
На четырех человек, пожалуйста.
[Pause]
Отлично. На какое имя оформить брронирование?
[Pause]
Иванов.
[Pause]
Спасибо, господин Иванов. Ваше бронирование подтверждено: суббота, 20 марта в 19:00 на четырех человек. С нетерпением ждем вас!`,
        hotel: `Добро пожаловать в отель "Солнечный пляж". Добрый день. Чем я вам могу помочь?
[Pause]
Мне нужен номер с 1 по 3 мая на двоих.
[Pause]
Прекрасно. У нас есть несколько вариантов. Вы предпочитаете стандартный номер или люкс?
[Pause]
Люкс, пожалуйста.
[Pause]
Отличный выбор. На какое имя оформить брронирование?
[Pause]
Петров.
[Pause]
Отлично, господин Петров. Ваше бронирование подтверждено: 1-3 мая, люкс-номер на двоих. Вам будет отправлено письмо с подтверждением.`,
    },
    pl: {
        restaurant: `Dzień dobry, dziękuję za telefon do restauracji Oliwka. Jak się mam do was odnieść?
[Pause]
Chciałbym zarezerwować stolik na tę sobotę, 20 marca, na godzinę 19:00.
[Pause]
Oczywiście. Na ile osób zarezerwować stolik?
[Pause]
Na czterech osób, proszę.
[Pause]
Doskonale. Na jakie nazwisko zarejestrować rezerwację?
[Pause]
Kowalski.
[Pause]
Dziękuję, panie Kowalski. Twoja rezerwacja na czterech osób w sobotę 20 marca o godzinie 19:00 jest potwierdzona. Czekamy na ciebie!`,
        hotel: `Witamy w Hotelu Słoneczna Plaża. Dzień dobry. W czym mogę Państwu pomóc?
[Pause]
Potrzebuję pokój od 1 do 3 maja dla dwóch osób.
[Pause]
Świetnie. Mamy kilka opcji dostępnych. Czy prefers Pan pokój standardowy czy luksusowy?
[Pause]
Pokój luksusowy, proszę.
[Pause]
Doskonały wybór. Na jakie nazwisko zarejestrować rezerwację?
[Pause]
Nowak.
[Pause]
Doskonale, panie Nowak. Twoja rezerwacja jest potwierdzona: 1-3 maja, pokój luksusowy na dwóch osób. Zostanie wysłany e-mail z potwierdzeniem.`,
    },
    fr: {
        restaurant: `Bonjour, merci d'appeler le restaurant L'Olivier. Comment puis-je vous aider?
[Pause]
Je voudrais faire une réservation pour ce samedi, 20 mars, à 19:00.
[Pause]
Bien sûr. Pour combien de personnes?
[Pause]
Pour quatre personnes, s'il vous plaît.
[Pause]
Parfait. Sous quel nom souhaitez-vous la réservation?
[Pause]
Dubois.
[Pause]
Merci, Monsieur Dubois. Votre réservation pour quatre personnes samedi 20 mars à 19:00 est confirmée. Nous vous attendons!`,
        hotel: `Bienvenue à l'Hôtel Plage Ensoleillée. Bonjour. Comment puis-je vous aider?
[Pause]
Je souhaite une chambre du 1er au 3 mai pour deux personnes.
[Pause]
Excellent. Nous avons plusieurs options disponibles. Préférez-vous une chambre standard ou une suite de luxe?
[Pause]
Une suite de luxe, s'il vous plaît.
[Pause]
Très bon choix. Sous quel nom souhaitez-vous faire la réservation?
[Pause]
Martin.
[Pause]
Parfait, Monsieur Martin. Votre réservation est confirmée : 1er-3 mai, suite de luxe pour deux personnes. Un email de confirmation sera envoyé.`,
    },
};
async function generateAudio(text, voiceId, outputPath, languageCode) {
    console.log(`Generating audio: ${path.basename(outputPath)}`);
    const response = await axios_1.default.post(`${ELEVENLABS_API}/text-to-speech/${voiceId}`, {
        text: text.replace(/\[Pause\]/g, ""), // Remove pause markers for actual TTS
        model_id: "eleven_v3", // Premium v3 model
        language_code: languageCode,
        voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
        },
    }, {
        headers: {
            "xi-api-key": API_KEY,
            "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
    });
    fs.writeFileSync(outputPath, response.data);
    console.log(`✓ Generated: ${path.basename(outputPath)}`);
}
async function main() {
    const outputDir = path.join(process.cwd(), "public", "audio", "demos");
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    console.log(`Generating audio demos in: ${outputDir}\n`);
    const languages = Object.keys(SCRIPTS);
    let count = 0;
    for (const locale of languages) {
        const scenarios = SCRIPTS[locale];
        const voiceId = VOICE_MAP[locale];
        const languageCode = LANGUAGE_CODE_MAP[locale];
        if (!voiceId) {
            console.warn(`⚠ No voice configured for locale: ${locale}`);
            continue;
        }
        if (!languageCode) {
            console.warn(`⚠ No language code configured for locale: ${locale}`);
            continue;
        }
        for (const [scenario, script] of Object.entries(scenarios)) {
            const filename = `${locale}-${scenario}.mp3`;
            const outputPath = path.join(outputDir, filename);
            try {
                await generateAudio(script, voiceId, outputPath, languageCode);
                count++;
            }
            catch (error) {
                console.error(`✗ Failed to generate ${filename}:`, error instanceof Error ? error.message : error);
            }
        }
    }
    console.log(`\n✓ Generated ${count} audio files successfully in ${outputDir}`);
}
main().catch(console.error);
