#!/usr/bin/env python3
"""
Fill i18n gaps: `hero.chat.scenarios` and `value_props.tags` existed only in
de + en, so the animated hero chat and the hashtag carousel fell back to
German on the other 11 locales. This script injects proper translations.

Run once:  python3 scripts/fill_i18n_gaps.py
Idempotent — re-running overwrites the same keys with the same values.
"""
import copy
import json
import os

ROOT = os.path.join(os.path.dirname(__file__), "..", "dictionaries")

# ---------------------------------------------------------------------------
# scenario translations: (hotel_guest, hotel_greeting, hotel_agent,
#   hotel_w_title, hotel_w_detail,
#   rest_guest, rest_agent, rest_date, rest_confirmed,
#   praxis_guest, praxis_agent, praxis_date, praxis_confirmed)
# tag translations: list of 6 (label, desc)
# ---------------------------------------------------------------------------
T = {
  "es": {
    "sc": ["¡Buenas noches! ¿Les queda una habitación para dos noches este viernes?",
           "¡Buenas noches! ¿En qué puedo ayudarle?",
           "¡Por supuesto! Hay una habitación doble con vista al jardín disponible. ¿Se la reservo?",
           "Reserva confirmada", "Habitación doble · vie–dom · 2 huéspedes",
           "¿Tienen una mesa para cuatro el sábado a las 19:00?",
           "Sí, todavía tenemos sitio. ¿Le reservo la mesa?",
           "sáb, 12 jul", "Mesa reservada",
           "¿Podemos ir al médico mañana por la mañana?",
           "Sí, mañana por la mañana quedan citas libres. ¿Qué hora le viene bien?",
           "vie, 11 jul", "Cita registrada"],
    "tags": [["#24/7", "También de noche y los domingos"],
             ["#30Idiomas", "Huéspedes internacionales bienvenidos"],
             ["#RGPD", "Alojado en Alemania"],
             ["#SinEsperas", "Atención inmediata"],
             ["#IntegraciónPMS", "Calendario y reservas"],
             ["#4SemanasLive", "Operativo en poco tiempo"]],
  },
  "fr": {
    "sc": ["Bonsoir ! Avez-vous encore une chambre pour deux nuits ce vendredi ?",
           "Bonsoir ! Comment puis-je vous aider ?",
           "Bien sûr ! Une chambre double avec vue sur le jardin est disponible. Je vous la réserve ?",
           "Réservation confirmée", "Chambre double · ven–dim · 2 personnes",
           "Avez-vous une table pour quatre samedi à 19 h ?",
           "Oui, il nous reste de la place. Je vous réserve la table ?",
           "sam. 12 juil.", "Table réservée",
           "Pouvons-nous venir chez le médecin demain matin ?",
           "Oui, il reste des rendez-vous demain matin. Quelle heure vous convient ?",
           "ven. 11 juil.", "Rendez-vous enregistré"],
    "tags": [["#24/7", "Aussi la nuit et le dimanche"],
             ["#30Langues", "Clients internationaux bienvenus"],
             ["#RGPD", "Hébergé en Allemagne"],
             ["#SansAttente", "Prise d'appel immédiate"],
             ["#IntégrationPMS", "Calendrier & réservations"],
             ["#Live4Semaines", "Opérationnel rapidement"]],
  },
  "tr": {
    "sc": ["İyi akşamlar! Bu cuma için iki gecelik boş odanız var mı?",
           "İyi akşamlar! Size nasıl yardımcı olabilirim?",
           "Elbette! Bahçe manzaralı bir çift kişilik odamız müsait. Sizin için rezerve edeyim mi?",
           "Rezervasyon onaylandı", "Çift kişilik oda · Cum–Paz · 2 misafir",
           "Cumartesi saat 19:00 için dört kişilik masanız var mı?",
           "Evet, hâlâ yerimiz var. Masayı sizin için ayırtayım mı?",
           "Cmt, 12 Tem", "Masa rezerve edildi",
           "Yarın sabah doktora gelebilir miyiz?",
           "Evet, yarın sabah için boş randevular var. Hangi saat size uygun?",
           "Cum, 11 Tem", "Randevu kaydedildi"],
    "tags": [["#7/24", "Gece ve pazar günleri dahil"],
             ["#30Dil", "Uluslararası misafirlere açık"],
             ["#GDPR", "Almanya'da barındırılıyor"],
             ["#BeklemeYok", "Anında yanıt"],
             ["#PMSEntegrasyonu", "Takvim & rezervasyon"],
             ["#4HaftadaCanlı", "Hızla kullanıma hazır"]],
  },
  "ru": {
    "sc": ["Добрый вечер! У вас ещё есть номер на две ночи в эту пятницу?",
           "Добрый вечер! Чем могу помочь?",
           "Конечно! Свободен двухместный номер с видом на сад. Забронировать его для вас?",
           "Бронирование подтверждено", "Двухместный номер · пт–вс · 2 гостя",
           "Есть ли у вас столик на четверых в субботу в 19:00?",
           "Да, места ещё есть. Забронировать столик для вас?",
           "сб, 12 июл", "Столик забронирован",
           "Можем ли мы прийти к врачу завтра утром?",
           "Да, завтра утром ещё есть свободное время. Какое время вам подходит?",
           "пт, 11 июл", "Запись оформлена"],
    "tags": [["#24/7", "Ночью и по воскресеньям тоже"],
             ["#30Языков", "Рады международным гостям"],
             ["#GDPR", "Хостинг в Германии"],
             ["#БезОжидания", "Мгновенный ответ"],
             ["#PMSИнтеграция", "Календарь и брони"],
             ["#Запуск4Недели", "Быстрый старт"]],
  },
  "pl": {
    "sc": ["Dobry wieczór! Czy mają Państwo jeszcze pokój na dwie noce w ten piątek?",
           "Dobry wieczór! W czym mogę pomóc?",
           "Oczywiście! Dostępny jest pokój dwuosobowy z widokiem na ogród. Czy mam go zarezerwować?",
           "Rezerwacja potwierdzona", "Pokój dwuosobowy · pt–nd · 2 gości",
           "Czy mają Państwo stolik dla czterech osób w sobotę o 19:00?",
           "Tak, mamy jeszcze wolne miejsca. Czy zarezerwować stolik?",
           "sob., 12 lip", "Stolik zarezerwowany",
           "Czy możemy przyjść do lekarza jutro rano?",
           "Tak, jutro rano są jeszcze wolne terminy. Która godzina Państwu odpowiada?",
           "pt., 11 lip", "Wizyta umówiona"],
    "tags": [["#24/7", "Także w nocy i w niedziele"],
             ["#30Języków", "Goście z zagranicy mile widziani"],
             ["#RODO", "Hosting w Niemczech"],
             ["#BezKolejki", "Natychmiastowe odebranie"],
             ["#IntegracjaPMS", "Kalendarz i rezerwacje"],
             ["#4TygodnieLive", "Szybkie wdrożenie"]],
  },
  "ar": {
    "sc": ["مساء الخير! هل لديكم غرفة متاحة لليلتين يوم الجمعة القادم؟",
           "مساء الخير! كيف يمكنني مساعدتك؟",
           "بالتأكيد! تتوفر غرفة مزدوجة بإطلالة على الحديقة. هل أحجزها لك؟",
           "تم تأكيد الحجز", "غرفة مزدوجة · الجمعة–الأحد · ضيفان",
           "هل لديكم طاولة لأربعة أشخاص يوم السبت الساعة 19:00؟",
           "نعم، لا تزال لدينا أماكن متاحة. هل أحجز الطاولة لك؟",
           "السبت 12 يوليو", "تم حجز الطاولة",
           "هل يمكننا الحضور إلى الطبيب غدًا صباحًا؟",
           "نعم، لا تزال هناك مواعيد متاحة غدًا صباحًا. ما الوقت المناسب لك؟",
           "الجمعة 11 يوليو", "تم تسجيل الموعد"],
    "tags": [["#24/7", "حتى في الليل وأيام الأحد"],
             ["#30لغة", "نرحب بالضيوف الدوليين"],
             ["#GDPR", "استضافة في ألمانيا"],
             ["#بدون_انتظار", "رد فوري"],
             ["#تكامل_PMS", "التقويم والحجوزات"],
             ["#جاهز_في_4_أسابيع", "تشغيل سريع"]],
  },
  "zh": {
    "sc": ["晚上好！这周五还有可以住两晚的房间吗？",
           "晚上好！请问有什么可以帮您？",
           "当然有！一间花园景观双人房目前可预订。需要我为您预订吗？",
           "预订已确认", "双人房 · 周五–周日 · 2位客人",
           "周六晚上7点有四人桌吗？",
           "有的，我们还有空位。需要我为您预订这张桌子吗？",
           "周六 7月12日", "餐桌已预订",
           "我们明天早上可以来看医生吗？",
           "可以，明天早上还有空余号源。您方便几点？",
           "周五 7月11日", "预约已登记"],
    "tags": [["#24/7", "夜间和周日也在线"],
             ["#30种语言", "欢迎国际客人"],
             ["#GDPR", "数据托管在德国"],
             ["#无需等待", "立即接听"],
             ["#PMS集成", "日历与预订"],
             ["#4周上线", "快速投入使用"]],
  },
  "el": {
    "sc": ["Καλησπέρα! Έχετε ακόμη ένα δωμάτιο για δύο βράδια αυτή την Παρασκευή;",
           "Καλησπέρα! Πώς μπορώ να σας βοηθήσω;",
           "Φυσικά! Υπάρχει διαθέσιμο ένα δίκλινο με θέα στον κήπο. Να το κρατήσω για εσάς;",
           "Η κράτηση επιβεβαιώθηκε", "Δίκλινο · Παρ–Κυρ · 2 επισκέπτες",
           "Έχετε τραπέζι για τέσσερα άτομα το Σάββατο στις 19:00;",
           "Ναι, υπάρχουν ακόμη θέσεις. Να κρατήσω το τραπέζι για εσάς;",
           "Σάβ, 12 Ιουλ", "Το τραπέζι κρατήθηκε",
           "Μπορούμε να έρθουμε στον γιατρό αύριο το πρωί;",
           "Ναι, αύριο το πρωί υπάρχουν ακόμη ελεύθερα ραντεβού. Ποια ώρα σας εξυπηρετεί;",
           "Παρ, 11 Ιουλ", "Το ραντεβού καταχωρήθηκε"],
    "tags": [["#24/7", "Και τη νύχτα και τις Κυριακές"],
             ["#30Γλώσσες", "Καλωσορίζουμε διεθνείς επισκέπτες"],
             ["#GDPR", "Φιλοξενία στη Γερμανία"],
             ["#ΧωρίςΑναμονή", "Άμεση απάντηση"],
             ["#ΕνσωμάτωσηPMS", "Ημερολόγιο & κρατήσεις"],
             ["#Live4Εβδομάδες", "Γρήγορη έναρξη"]],
  },
  "ko": {
    "sc": ["안녕하세요! 이번 주 금요일에 2박 가능한 객실이 아직 있나요?",
           "안녕하세요! 무엇을 도와드릴까요?",
           "물론입니다! 정원 전망 더블룸이 예약 가능합니다. 예약해 드릴까요?",
           "예약 확정", "더블룸 · 금–일 · 게스트 2명",
           "토요일 저녁 7시에 4인 테이블 있나요?",
           "네, 아직 자리가 있습니다. 테이블을 예약해 드릴까요?",
           "토, 7월 12일", "테이블 예약 완료",
           "내일 아침에 진료 받으러 가도 될까요?",
           "네, 내일 오전에 아직 예약 가능한 시간이 있습니다. 몇 시가 괜찮으세요?",
           "금, 7월 11일", "예약 등록 완료"],
    "tags": [["#24/7", "밤과 일요일에도"],
             ["#30개언어", "해외 고객 환영"],
             ["#GDPR", "독일 내 호스팅"],
             ["#대기없음", "즉시 응답"],
             ["#PMS연동", "캘린더 & 예약"],
             ["#4주내오픈", "빠른 도입"]],
  },
  "vi": {
    "sc": ["Chào buổi tối! Thứ Sáu này còn phòng cho hai đêm không ạ?",
           "Chào buổi tối! Tôi có thể giúp gì cho quý khách?",
           "Tất nhiên ạ! Còn một phòng đôi nhìn ra vườn. Tôi đặt phòng cho quý khách nhé?",
           "Đã xác nhận đặt phòng", "Phòng đôi · T6–CN · 2 khách",
           "Thứ Bảy lúc 19:00 còn bàn cho bốn người không ạ?",
           "Dạ còn, chúng tôi vẫn còn chỗ. Tôi đặt bàn cho quý khách nhé?",
           "T7, 12/7", "Đã đặt bàn",
           "Sáng mai chúng tôi đến khám được không ạ?",
           "Dạ được, sáng mai vẫn còn lịch trống. Quý khách muốn mấy giờ ạ?",
           "T6, 11/7", "Đã đặt lịch hẹn"],
    "tags": [["#24/7", "Cả ban đêm và Chủ nhật"],
             ["#30NgônNgữ", "Chào đón khách quốc tế"],
             ["#GDPR", "Lưu trữ tại Đức"],
             ["#KhôngChờĐợi", "Trả lời ngay lập tức"],
             ["#TíchHợpPMS", "Lịch & đặt chỗ"],
             ["#4TuầnLive", "Triển khai nhanh"]],
  },
  "th": {
    "sc": ["สวัสดีค่ะ วันศุกร์นี้ยังมีห้องว่างสำหรับสองคืนไหมคะ",
           "สวัสดีค่ะ มีอะไรให้ช่วยไหมคะ",
           "มีค่ะ ห้องดับเบิลวิวสวนยังว่างอยู่ ให้จองไว้ให้เลยไหมคะ",
           "ยืนยันการจองแล้ว", "ห้องดับเบิล · ศ.–อา. · ผู้เข้าพัก 2 ท่าน",
           "วันเสาร์เวลา 19:00 มีโต๊ะสำหรับสี่ท่านไหมคะ",
           "มีค่ะ ยังมีที่ว่างอยู่ ให้จองโต๊ะไว้ให้เลยไหมคะ",
           "ส. 12 ก.ค.", "จองโต๊ะแล้ว",
           "พรุ่งนี้เช้าขอเข้าพบแพทย์ได้ไหมคะ",
           "ได้ค่ะ พรุ่งนี้เช้ายังมีคิวว่าง สะดวกกี่โมงคะ",
           "ศ. 11 ก.ค.", "บันทึกนัดหมายแล้ว"],
    "tags": [["#24/7", "กลางคืนและวันอาทิตย์ก็พร้อม"],
             ["#30ภาษา", "ยินดีต้อนรับแขกต่างชาติ"],
             ["#GDPR", "โฮสต์ในเยอรมนี"],
             ["#ไม่ต้องรอสาย", "รับสายทันที"],
             ["#เชื่อมต่อPMS", "ปฏิทินและการจอง"],
             ["#ใช้งานใน4สัปดาห์", "เริ่มได้รวดเร็ว"]],
  },
}

TIMES_24H = ["18:30", "19:00", "19:30", "20:00"]
TIMES_MORNING = ["08:00", "08:30", "09:00", "09:30"]


def build_scenarios(base, tr):
    (h_guest, h_greet, h_agent, h_wt, h_wd,
     r_guest, r_agent, r_date, r_conf,
     p_guest, p_agent, p_date, p_conf) = tr
    sc = copy.deepcopy(base)
    hotel, rest, praxis = sc[0], sc[1], sc[2]

    hotel.update(guest=h_guest, agentGreeting=h_greet, agent=h_agent)
    hotel["widget"].update(title=h_wt, detail=h_wd)

    rest.update(guest=r_guest, agent=r_agent)
    rest["widget"].update(date=r_date, confirmed=r_conf,
                          times=TIMES_24H, selected="19:00")

    praxis.update(guest=p_guest, agent=p_agent)
    praxis["widget"].update(date=p_date, confirmed=p_conf,
                            times=TIMES_MORNING, selected="08:30")
    return sc


def main():
    with open(os.path.join(ROOT, "en.json"), encoding="utf-8") as f:
        base_scenarios = json.load(f)["hero"]["chat"]["scenarios"]

    for locale, tr in T.items():
        path = os.path.join(ROOT, f"{locale}.json")
        with open(path, encoding="utf-8") as f:
            d = json.load(f)

        d.setdefault("hero", {}).setdefault("chat", {})
        d["hero"]["chat"]["scenarios"] = build_scenarios(base_scenarios, tr["sc"])
        d.setdefault("value_props", {})
        d["value_props"]["tags"] = [{"label": l, "desc": desc} for l, desc in tr["tags"]]

        with open(path, "w", encoding="utf-8") as f:
            json.dump(d, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(f"✓ {locale}: scenarios ({len(d['hero']['chat']['scenarios'])}) + tags (6) written")


if __name__ == "__main__":
    main()
