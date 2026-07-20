#!/usr/bin/env python3
"""
Sync hero.chat.scenarios (5 ids: spa, praxis, delivery, restaurant, salon)
into every locale dictionary. Structure matches de/en; dialogue is translated.

Run:  python scripts/sync_hero_scenarios.py
"""
import json
import os

ROOT = os.path.join(os.path.dirname(__file__), "..", "dictionaries")

AVATARS = {
    "spa": "/images/avatars/hero-spa.jpg",
    "praxis": "/images/avatars/hero-praxis-v2.jpg",
    "delivery": "/images/avatars/hero-delivery.jpg",
    "restaurant": "/images/avatars/hero-restaurant.jpg",
    "salon": "/images/avatars/hero-salon.jpg",
}

# Per-locale string packs. Keys match scenario fields used in UI.
LOCALES = {
    "fr": {
        "spa": {
            "guest": "Bonjour, ici Nina — êtes-vous ouverts le dimanche aussi ?",
            "agent": "Oui, Nina — dimanche de 10 h à 18 h. Je vous réserve un créneau ?",
            "widget": {"type": "booking", "title": "Rendez-vous confirmé", "detail": "Dimanche · 11:00 · Spa"},
        },
        "praxis": {
            "agentGreeting": "Bonjour, cabinet du Dr Weber.",
            "guest": "Bonjour, ici Sabine.",
            "agent": "Bonjour Sabine — un créneau IRM est libre jeudi à 14 h 30. Vous le souhaitez ?",
            "guestFollowUp": "Oui, volontiers.",
            "agentFollowUp": "Parfait — je l'enregistre.",
            "widget": {"type": "booking", "title": "Rendez-vous IRM confirmé", "detail": "Jeudi · 14:30"},
        },
        "delivery": {
            "guest": "Bonjour, ici Elena — où est mon repas, commande #CGH6P8 ?",
            "agent": "Elena, commande #CGH6P8 en route — environ huit minutes.",
            "widget": {
                "type": "status",
                "icon": "maps",
                "label": "En route",
                "detail": "Arrivée ~8 min · #CGH6P8",
            },
        },
        "restaurant": {
            "guest": "Bonjour, ici Anna — avez-vous encore une table pour 2 à 19 h 30 ce soir ? Et un parking ?",
            "agent": "Oui, Anna — 19 h 30 convient, parking devant la porte.",
            "widget": {
                "type": "booking",
                "title": "Table réservée",
                "detail": "Ce soir · 19:30 · 2 pers. · Parking oui",
            },
        },
        "salon": {
            "guest": "Bonjour, ici Mia — je voudrais me faire colorer les cheveux.",
            "agent": "Avec plaisir, Mia ! Chez Sandra ou Tom — et quand ?",
            "guestFollowUp": "Sandra, jeudi à 14 h s'il vous plaît.",
            "agentFollowUp": "Parfait — rendez-vous chez Sandra enregistré.",
            "widget": {
                "type": "booking",
                "title": "Rendez-vous chez Sandra",
                "detail": "Jeudi · 14:00 · Coloration",
            },
        },
    },
    "es": {
        "spa": {
            "guest": "Hola, soy Nina — ¿abrís también los domingos?",
            "agent": "Sí, Nina — domingos de 10 a 18. ¿Te apunto una cita?",
            "widget": {"type": "booking", "title": "Cita confirmada", "detail": "Domingo · 11:00 · Spa"},
        },
        "praxis": {
            "agentGreeting": "Buenos días, consulta del Dr. Weber.",
            "guest": "Hola, soy Sabine.",
            "agent": "Hola Sabine — hay un hueco de RM el jueves a las 14:30. ¿Lo quiere?",
            "guestFollowUp": "Sí, por favor.",
            "agentFollowUp": "Listo — lo apunto.",
            "widget": {"type": "booking", "title": "Cita de RM confirmada", "detail": "Jueves · 14:30"},
        },
        "delivery": {
            "guest": "Hola, soy Elena — ¿dónde está mi comida, pedido #CGH6P8?",
            "agent": "Elena, el pedido #CGH6P8 va de camino — unos ocho minutos.",
            "widget": {
                "type": "status",
                "icon": "maps",
                "label": "En camino",
                "detail": "Llegada ~8 min · #CGH6P8",
            },
        },
        "restaurant": {
            "guest": "Hola, soy Anna — ¿tenéis mesa para 2 a las 19:30 hoy? ¿Y parking?",
            "agent": "Sí, Anna — 19:30 vale, parking delante.",
            "widget": {
                "type": "booking",
                "title": "Mesa reservada",
                "detail": "Hoy · 19:30 · 2 personas · Parking sí",
            },
        },
        "salon": {
            "guest": "Hola, soy Mia — me gustaría teñirme el pelo.",
            "agent": "Claro, Mia! ¿Con Sandra o Tom — y cuándo?",
            "guestFollowUp": "Sandra, el jueves a las 14:00 por favor.",
            "agentFollowUp": "Listo — cita con Sandra apuntada.",
            "widget": {
                "type": "booking",
                "title": "Cita con Sandra",
                "detail": "Jueves · 14:00 · Tinte",
            },
        },
    },
    "tr": {
        "spa": {
            "guest": "Merhaba, ben Nina — pazar günleri de açık mısınız?",
            "agent": "Evet Nina — pazar 10–18. Randevu yazayım mı?",
            "widget": {"type": "booking", "title": "Randevu onaylandı", "detail": "Pazar · 11:00 · Spa"},
        },
        "praxis": {
            "agentGreeting": "Günaydın, Dr. Weber muayenehanesi.",
            "guest": "Merhaba, ben Sabine.",
            "agent": "Merhaba Sabine — perşembe 14:30'da boş bir MR randevusu var. İster misiniz?",
            "guestFollowUp": "Evet, lütfen.",
            "agentFollowUp": "Tamam — kaydettim.",
            "widget": {"type": "booking", "title": "MR randevusu onaylandı", "detail": "Perşembe · 14:30"},
        },
        "delivery": {
            "guest": "Merhaba, ben Elena — yemeğim nerede, sipariş #CGH6P8?",
            "agent": "Elena, #CGH6P8 siparişi yolda — yaklaşık sekiz dakika.",
            "widget": {
                "type": "status",
                "icon": "maps",
                "label": "Yolda",
                "detail": "Varış ~8 dk · #CGH6P8",
            },
        },
        "restaurant": {
            "guest": "Merhaba, ben Anna — bugün 19:30 için 2 kişilik masa var mı? Park yeri?",
            "agent": "Evet Anna — 19:30 uygun, park kapının önünde.",
            "widget": {
                "type": "booking",
                "title": "Masa rezerve edildi",
                "detail": "Bugün · 19:30 · 2 kişi · Park var",
            },
        },
        "salon": {
            "guest": "Merhaba, ben Mia — saçımı boyatmak istiyorum.",
            "agent": "Tabii Mia! Sandra mı Tom mu — ve ne zaman?",
            "guestFollowUp": "Sandra, perşembe 14:00 lütfen.",
            "agentFollowUp": "Tamam — Sandra ile randevu alındı.",
            "widget": {
                "type": "booking",
                "title": "Sandra ile randevu",
                "detail": "Perşembe · 14:00 · Boya",
            },
        },
    },
    "ru": {
        "spa": {
            "guest": "Здравствуйте, это Нина — вы открыты по воскресеньям?",
            "agent": "Да, Нина — по воскресеньям с 10 до 18. Записать вас?",
            "widget": {"type": "booking", "title": "Запись подтверждена", "detail": "Воскресенье · 11:00 · Spa"},
        },
        "praxis": {
            "agentGreeting": "Добрый день, клиника доктора Вебера.",
            "guest": "Здравствуйте, это Сабина.",
            "agent": "Здравствуйте, Сабина — есть свободный слот МРТ в четверг в 14:30. Берёте?",
            "guestFollowUp": "Да, пожалуйста.",
            "agentFollowUp": "Отлично — записываю.",
            "widget": {"type": "booking", "title": "МРТ подтверждено", "detail": "Четверг · 14:30"},
        },
        "delivery": {
            "guest": "Здравствуйте, это Елена — где моя еда, заказ #CGH6P8?",
            "agent": "Елена, заказ #CGH6P8 в пути — около восьми минут.",
            "widget": {
                "type": "status",
                "icon": "maps",
                "label": "В пути",
                "detail": "Прибытие ~8 мин · #CGH6P8",
            },
        },
        "restaurant": {
            "guest": "Здравствуйте, это Анна — есть стол на двоих на 19:30 сегодня? И парковка?",
            "agent": "Да, Анна — 19:30 подходит, парковка у входа.",
            "widget": {
                "type": "booking",
                "title": "Стол забронирован",
                "detail": "Сегодня · 19:30 · 2 гостя · Парковка да",
            },
        },
        "salon": {
            "guest": "Здравствуйте, это Миа — хочу покрасить волосы.",
            "agent": "Конечно, Миа! К Сандре или Тому — и когда?",
            "guestFollowUp": "Сандра, в четверг в 14:00 пожалуйста.",
            "agentFollowUp": "Готово — запись к Сандре есть.",
            "widget": {
                "type": "booking",
                "title": "Запись к Сандре",
                "detail": "Четверг · 14:00 · Окрашивание",
            },
        },
    },
    "pl": {
        "spa": {
            "guest": "Dzień dobry, tu Nina — czy jesteście otwarci w niedzielę?",
            "agent": "Tak, Nina — w niedzielę 10–18. Mam zapisać termin?",
            "widget": {"type": "booking", "title": "Termin potwierdzony", "detail": "Niedziela · 11:00 · Spa"},
        },
        "praxis": {
            "agentGreeting": "Dzień dobry, gabinet dr. Webera.",
            "guest": "Dzień dobry, tu Sabine.",
            "agent": "Dzień dobry Sabine — jest wolny termin MRI w czwartek o 14:30. Bierze Pani?",
            "guestFollowUp": "Tak, proszę.",
            "agentFollowUp": "Jasne — zapisuję.",
            "widget": {"type": "booking", "title": "Termin MRI potwierdzony", "detail": "Czwartek · 14:30"},
        },
        "delivery": {
            "guest": "Dzień dobry, tu Elena — gdzie jest moje jedzenie, zamówienie #CGH6P8?",
            "agent": "Elena, zamówienie #CGH6P8 jest w drodze — ok. osiem minut.",
            "widget": {
                "type": "status",
                "icon": "maps",
                "label": "W drodze",
                "detail": "Przyjazd ~8 min · #CGH6P8",
            },
        },
        "restaurant": {
            "guest": "Dzień dobry, tu Anna — macie stolik na 2 osoby na 19:30 dziś? I parking?",
            "agent": "Tak, Anna — 19:30 pasuje, parking przed lokalem.",
            "widget": {
                "type": "booking",
                "title": "Stolik zarezerwowany",
                "detail": "Dziś · 19:30 · 2 osoby · Parking tak",
            },
        },
        "salon": {
            "guest": "Dzień dobry, tu Mia — chciałabym farbować włosy.",
            "agent": "Jasne, Mia! Sandra czy Tom — i kiedy?",
            "guestFollowUp": "Sandra, w czwartek o 14:00 proszę.",
            "agentFollowUp": "Gotowe — termin u Sandry zapisany.",
            "widget": {
                "type": "booking",
                "title": "Termin u Sandry",
                "detail": "Czwartek · 14:00 · Farbowanie",
            },
        },
    },
    "ar": {
        "spa": {
            "guest": "مرحباً، أنا نينا — هل أنتم مفتوحون يوم الأحد أيضاً؟",
            "agent": "نعم نينا — الأحد من 10 إلى 18. أحجز لك موعداً؟",
            "widget": {"type": "booking", "title": "تم تأكيد الموعد", "detail": "الأحد · 11:00 · سبا"},
        },
        "praxis": {
            "agentGreeting": "صباح الخير، عيادة الدكتور فيبر.",
            "guest": "مرحباً، أنا سابينه.",
            "agent": "مرحباً سابينه — يتوفر موعد رنين مغناطيسي الخميس الساعة 14:30. هل تريدينه؟",
            "guestFollowUp": "نعم من فضلك.",
            "agentFollowUp": "حسناً — سجّلته.",
            "widget": {"type": "booking", "title": "تم تأكيد موعد الرنين", "detail": "الخميس · 14:30"},
        },
        "delivery": {
            "guest": "مرحباً، أنا إلينا — أين طعامي، طلب #CGH6P8؟",
            "agent": "إلينا، الطلب #CGH6P8 في الطريق — حوالي ثماني دقائق.",
            "widget": {
                "type": "status",
                "icon": "maps",
                "label": "في الطريق",
                "detail": "الوصول ~8 دق · #CGH6P8",
            },
        },
        "restaurant": {
            "guest": "مرحباً، أنا آنا — هل لديكم طاولة لشخصين الساعة 19:30 اليوم؟ وموقف سيارات؟",
            "agent": "نعم آنا — 19:30 مناسبة، الموقف أمام الباب.",
            "widget": {
                "type": "booking",
                "title": "تم حجز الطاولة",
                "detail": "اليوم · 19:30 · شخصان · موقف نعم",
            },
        },
        "salon": {
            "guest": "مرحباً، أنا ميا — أود صبغ شعري.",
            "agent": "بالتأكيد ميا! مع ساندرا أو توم — ومتى؟",
            "guestFollowUp": "ساندرا، الخميس الساعة 14:00 من فضلك.",
            "agentFollowUp": "تمام — الموعد مع ساندرا مسجّل.",
            "widget": {
                "type": "booking",
                "title": "موعد مع ساندرا",
                "detail": "الخميس · 14:00 · صبغ",
            },
        },
    },
    "zh": {
        "spa": {
            "guest": "你好，我是Nina——你们周日也营业吗？",
            "agent": "是的，Nina——周日10点到18点。要帮您预约吗？",
            "widget": {"type": "booking", "title": "预约已确认", "detail": "周日 · 11:00 · Spa"},
        },
        "praxis": {
            "agentGreeting": "您好，Weber医生诊所。",
            "guest": "你好，我是Sabine。",
            "agent": "您好Sabine——周四14:30有一个核磁空档，要预约吗？",
            "guestFollowUp": "好的，谢谢。",
            "agentFollowUp": "好的——已为您登记。",
            "widget": {"type": "booking", "title": "核磁预约已确认", "detail": "周四 · 14:30"},
        },
        "delivery": {
            "guest": "你好，我是Elena——我的餐到哪了，订单#CGH6P8？",
            "agent": "Elena，订单#CGH6P8正在配送——大约八分钟。",
            "widget": {
                "type": "status",
                "icon": "maps",
                "label": "配送中",
                "detail": "约8分钟到达 · #CGH6P8",
            },
        },
        "restaurant": {
            "guest": "你好，我是Anna——今天19:30还有2人桌吗？有停车位吗？",
            "agent": "可以，Anna——19:30没问题，门口有停车位。",
            "widget": {
                "type": "booking",
                "title": "已预订餐桌",
                "detail": "今天 · 19:30 · 2人 · 可停车",
            },
        },
        "salon": {
            "guest": "你好，我是Mia——想染头发。",
            "agent": "当然，Mia！Sandra还是Tom——什么时候？",
            "guestFollowUp": "Sandra，周四14:00，谢谢。",
            "agentFollowUp": "好的——已预约Sandra。",
            "widget": {
                "type": "booking",
                "title": "Sandra预约",
                "detail": "周四 · 14:00 · 染发",
            },
        },
    },
    "el": {
        "spa": {
            "guest": "Γεια σας, είμαι η Nina — είστε ανοιχτά και την Κυριακή;",
            "agent": "Ναι, Nina — Κυριακή 10–18. Να κλείσω ραντεβού;",
            "widget": {"type": "booking", "title": "Το ραντεβού επιβεβαιώθηκε", "detail": "Κυριακή · 11:00 · Spa"},
        },
        "praxis": {
            "agentGreeting": "Καλημέρα, ιατρείο Δρ. Weber.",
            "guest": "Γεια σας, είμαι η Sabine.",
            "agent": "Γεια σας Sabine — υπάρχει κενό MRI την Πέμπτη στις 14:30. Το θέλετε;",
            "guestFollowUp": "Ναι, παρακαλώ.",
            "agentFollowUp": "Εντάξει — το καταχωρώ.",
            "widget": {"type": "booking", "title": "MRI επιβεβαιωμένο", "detail": "Πέμπτη · 14:30"},
        },
        "delivery": {
            "guest": "Γεια σας, είμαι η Elena — πού είναι το φαγητό μου, παραγγελία #CGH6P8;",
            "agent": "Elena, η παραγγελία #CGH6P8 είναι καθ' οδόν — περίπου οκτώ λεπτά.",
            "widget": {
                "type": "status",
                "icon": "maps",
                "label": "Καθ' οδόν",
                "detail": "Άφιξη ~8 λεπ · #CGH6P8",
            },
        },
        "restaurant": {
            "guest": "Γεια σας, είμαι η Anna — έχετε τραπέζι για 2 στις 19:30 σήμερα; Και πάρκινγκ;",
            "agent": "Ναι, Anna — 19:30 εντάξει, πάρκινγκ έξω.",
            "widget": {
                "type": "booking",
                "title": "Τραπέζι κρατημένο",
                "detail": "Σήμερα · 19:30 · 2 άτομα · Πάρκινγκ ναι",
            },
        },
        "salon": {
            "guest": "Γεια σας, είμαι η Mia — θα ήθελα να βάψω τα μαλλιά μου.",
            "agent": "Φυσικά, Mia! Sandra ή Tom — και πότε;",
            "guestFollowUp": "Sandra, Πέμπτη στις 14:00 παρακαλώ.",
            "agentFollowUp": "Έτοιμο — ραντεβού με τη Sandra.",
            "widget": {
                "type": "booking",
                "title": "Ραντεβού με Sandra",
                "detail": "Πέμπτη · 14:00 · Βαφή",
            },
        },
    },
    "ko": {
        "spa": {
            "guest": "안녕하세요, 니나입니다 — 일요일에도 영업하시나요?",
            "agent": "네, 니나님 — 일요일 10시부터 18시까지요. 예약해 드릴까요?",
            "widget": {"type": "booking", "title": "예약 확정", "detail": "일요일 · 11:00 · 스파"},
        },
        "praxis": {
            "agentGreeting": "안녕하세요, 베버 의사 클리닉입니다.",
            "guest": "안녕하세요, 사비네입니다.",
            "agent": "안녕하세요 사비네 님 — 목요일 14:30 MRI 자리가 있어요. 원하시나요?",
            "guestFollowUp": "네, 부탁드려요.",
            "agentFollowUp": "알겠습니다 — 등록했어요.",
            "widget": {"type": "booking", "title": "MRI 예약 확정", "detail": "목요일 · 14:30"},
        },
        "delivery": {
            "guest": "안녕하세요, 엘레나입니다 — 음식 어디쯤인가요, 주문 #CGH6P8?",
            "agent": "엘레나 님, 주문 #CGH6P8 배송 중이에요 — 약 8분.",
            "widget": {
                "type": "status",
                "icon": "maps",
                "label": "배송 중",
                "detail": "약 8분 후 도착 · #CGH6P8",
            },
        },
        "restaurant": {
            "guest": "안녕하세요, 안나입니다 — 오늘 19:30에 2인 테이블 있나요? 주차도요?",
            "agent": "네, 안나 님 — 19:30 가능하고, 앞에 주차장이 있어요.",
            "widget": {
                "type": "booking",
                "title": "테이블 예약됨",
                "detail": "오늘 · 19:30 · 2명 · 주차 가능",
            },
        },
        "salon": {
            "guest": "안녕하세요, 미아입니다 — 머리 염색하고 싶어요.",
            "agent": "물론이죠, 미아 님! 산드라 아니면 톰 — 언제요?",
            "guestFollowUp": "산드라, 목요일 14시 부탁드려요.",
            "agentFollowUp": "알겠습니다 — 산드라 예약됐어요.",
            "widget": {
                "type": "booking",
                "title": "산드라 예약",
                "detail": "목요일 · 14:00 · 염색",
            },
        },
    },
    "vi": {
        "spa": {
            "guest": "Xin chào, tôi là Nina — cuối tuần các bạn có mở cửa không?",
            "agent": "Có Nina — Chủ nhật 10–18. Tôi đặt lịch giúp bạn nhé?",
            "widget": {"type": "booking", "title": "Đã xác nhận lịch", "detail": "Chủ nhật · 11:00 · Spa"},
        },
        "praxis": {
            "agentGreeting": "Xin chào, phòng khám bác sĩ Weber.",
            "guest": "Xin chào, tôi là Sabine.",
            "agent": "Chào Sabine — có suất MRI thứ Năm lúc 14:30. Bạn muốn không?",
            "guestFollowUp": "Vâng, làm ơn.",
            "agentFollowUp": "Xong — tôi đã ghi lại.",
            "widget": {"type": "booking", "title": "Đã xác nhận MRI", "detail": "Thứ Năm · 14:30"},
        },
        "delivery": {
            "guest": "Xin chào, tôi là Elena — đồ ăn đâu rồi, đơn #CGH6P8?",
            "agent": "Elena, đơn #CGH6P8 đang giao — khoảng tám phút.",
            "widget": {
                "type": "status",
                "icon": "maps",
                "label": "Đang giao",
                "detail": "Đến trong ~8 phút · #CGH6P8",
            },
        },
        "restaurant": {
            "guest": "Xin chào, tôi là Anna — còn bàn 2 người lúc 19:30 hôm nay không? Có chỗ đậu xe?",
            "agent": "Có Anna — 19:30 ổn, đậu xe ngay trước cửa.",
            "widget": {
                "type": "booking",
                "title": "Đã giữ bàn",
                "detail": "Hôm nay · 19:30 · 2 khách · Có đậu xe",
            },
        },
        "salon": {
            "guest": "Xin chào, tôi là Mia — tôi muốn nhuộm tóc.",
            "agent": "Được chứ Mia! Sandra hay Tom — và khi nào?",
            "guestFollowUp": "Sandra, thứ Năm lúc 14:00 ạ.",
            "agentFollowUp": "Xong — đã đặt với Sandra.",
            "widget": {
                "type": "booking",
                "title": "Lịch với Sandra",
                "detail": "Thứ Năm · 14:00 · Nhuộm",
            },
        },
    },
    "th": {
        "spa": {
            "guest": "สวัสดีค่ะ ดิฉันนีน่า — วันอาทิตย์เปิดไหมคะ?",
            "agent": "เปิดค่ะ นีน่า — อาทิตย์ 10–18 น. จองคิวให้ไหมคะ?",
            "widget": {"type": "booking", "title": "ยืนยันนัดแล้ว", "detail": "อาทิตย์ · 11:00 · สปา"},
        },
        "praxis": {
            "agentGreeting": "สวัสดีค่ะ คลินิกแพทย์เวเบอร์",
            "guest": "สวัสดีค่ะ ดิฉันซาบีน",
            "agent": "สวัสดีซาบีน — มีคิว MRI ว่างวันพฤหัส 14:30 ต้องการไหมคะ?",
            "guestFollowUp": "ได้ค่ะ",
            "agentFollowUp": "เรียบร้อย — จองให้แล้วค่ะ",
            "widget": {"type": "booking", "title": "ยืนยัน MRI แล้ว", "detail": "พฤหัส · 14:30"},
        },
        "delivery": {
            "guest": "สวัสดีค่ะ ดิฉันเอเลนา — อาหารอยู่ไหน ออเดอร์ #CGH6P8?",
            "agent": "เอเลนา ออเดอร์ #CGH6P8 กำลังมา — ประมาณแปดนาที",
            "widget": {
                "type": "status",
                "icon": "maps",
                "label": "กำลังจัดส่ง",
                "detail": "ถึงใน ~8 นาที · #CGH6P8",
            },
        },
        "restaurant": {
            "guest": "สวัสดีค่ะ ดิฉันอันนา — มีโต๊ะ 2 ที่ 19:30 วันนี้ไหม มีที่จอดรถไหม?",
            "agent": "มีค่ะ อันนา — 19:30 ได้ ที่จอดรถหน้าประตู",
            "widget": {
                "type": "booking",
                "title": "จองโต๊ะแล้ว",
                "detail": "วันนี้ · 19:30 · 2 ท่าน · มีที่จอด",
            },
        },
        "salon": {
            "guest": "สวัสดีค่ะ ดิฉันเมีย — อยากย้อมผมค่ะ",
            "agent": "ได้เลย เมีย! ซานดรา หรือ ทอม — แล้วเมื่อไหร่?",
            "guestFollowUp": "ซานดรา พฤหัส 14:00 ค่ะ",
            "agentFollowUp": "เรียบร้อย — นัดซานดราแล้วค่ะ",
            "widget": {
                "type": "booking",
                "title": "นัดกับซานดรา",
                "detail": "พฤหัส · 14:00 · ย้อมผม",
            },
        },
    },
}

NAMES = {
    "spa": "Nina",
    "praxis": "Sabine",
    "delivery": "Elena",
    "restaurant": "Anna",
    "salon": "Mia",
}
ORDER = ["spa", "praxis", "delivery", "restaurant", "salon"]


def build_scenarios(pack: dict) -> list:
    out = []
    for sid in ORDER:
        s = pack[sid]
        item = {
            "id": sid,
            "guestName": NAMES[sid],
            "guestAvatar": AVATARS[sid],
            "guest": s["guest"],
            "agent": s["agent"],
            "widget": s["widget"],
        }
        if "agentGreeting" in s:
            item["agentGreeting"] = s["agentGreeting"]
        if "guestFollowUp" in s:
            item["guestFollowUp"] = s["guestFollowUp"]
        if "agentFollowUp" in s:
            item["agentFollowUp"] = s["agentFollowUp"]
        out.append(item)
    return out


def main():
    for locale, pack in LOCALES.items():
        path = os.path.join(ROOT, f"{locale}.json")
        with open(path, encoding="utf-8") as f:
            d = json.load(f)
        d.setdefault("hero", {}).setdefault("chat", {})
        d["hero"]["chat"]["scenarios"] = build_scenarios(pack)
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(d, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(f"OK {locale}: {len(d['hero']['chat']['scenarios'])} scenarios")


if __name__ == "__main__":
    main()
