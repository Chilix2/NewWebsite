#!/usr/bin/env python3
"""
Fill i18n gaps for value_props.tags.

Hero chat scenarios are maintained by:
  python scripts/sync_hero_scenarios.py

Do NOT inject the old 3-scenario hotel/restaurant/praxis set here —
that would overwrite spa/praxis/delivery/restaurant/salon.

Run tags only:  python scripts/fill_i18n_gaps.py
"""
import json
import os

ROOT = os.path.join(os.path.dirname(__file__), "..", "dictionaries")

# tag translations: list of 6 (label, desc)
T = {
  "es": {
    "tags": [["#24/7", "También de noche y los domingos"],
             ["#30Idiomas", "Huéspedes internacionales bienvenidos"],
             ["#RGPD", "Alojado en Alemania"],
             ["#SinEsperas", "Atención inmediata"],
             ["#IntegraciónPMS", "Calendario y reservas"],
             ["#4SemanasLive", "Operativo en poco tiempo"]],
  },
  "fr": {
    "tags": [["#24/7", "Aussi la nuit et le dimanche"],
             ["#30Langues", "Clients internationaux bienvenus"],
             ["#RGPD", "Hébergé en Allemagne"],
             ["#SansAttente", "Prise d'appel immédiate"],
             ["#IntégrationPMS", "Calendrier & réservations"],
             ["#Live4Semaines", "Opérationnel rapidement"]],
  },
  "tr": {
    "tags": [["#7/24", "Gece ve pazar günleri dahil"],
             ["#30Dil", "Uluslararası misafirlere açık"],
             ["#GDPR", "Almanya'da barındırılıyor"],
             ["#BeklemeYok", "Anında yanıt"],
             ["#PMSEntegrasyonu", "Takvim & rezervasyon"],
             ["#4HaftadaCanlı", "Hızla kullanıma hazır"]],
  },
  "ru": {
    "tags": [["#24/7", "Также ночью и по воскресеньям"],
             ["#30Языков", "Международные гости желанны"],
             ["#GDPR", "Хостинг в Германии"],
             ["#БезОжидания", "Мгновенный ответ"],
             ["#ИнтеграцияPMS", "Календарь и бронирования"],
             ["#За4Недели", "Быстрый запуск"]],
  },
  "pl": {
    "tags": [["#24/7", "Także w nocy i w niedzielę"],
             ["#30Języków", "Goście międzynarodowi mile widziani"],
             ["#RODO", "Hosting w Niemczech"],
             ["#BezOczekiwania", "Natychmiastowa obsługa"],
             ["#IntegracjaPMS", "Kalendarz i rezerwacje"],
             ["#4TygodnieLive", "Szybko gotowe"]],
  },
  "ar": {
    "tags": [["#24/7", "أيضاً ليلاً ويوم الأحد"],
             ["#30لغة", "نرحب بالضيوف الدوليين"],
             ["#GDPR", "مستضاف في ألمانيا"],
             ["#بدونانتظار", "رد فوري"],
             ["#تكاملPMS", "التقويم والحجوزات"],
             ["#4أسابيع", "جاهز بسرعة"]],
  },
  "zh": {
    "tags": [["#24/7", "夜间和周日也可"],
             ["#30语言", "欢迎国际客人"],
             ["#GDPR", "托管于德国"],
             ["#无等待", "立即接听"],
             ["#PMS集成", "日历与预订"],
             ["#4周上线", "快速投入使用"]],
  },
  "el": {
    "tags": [["#24/7", "Και το βράδυ και την Κυριακή"],
             ["#30Γλώσσες", "Διεθνείς επισκέπτες καλοδεχούμενοι"],
             ["#GDPR", "Φιλοξενία στη Γερμανία"],
             ["#ΧωρίςΑναμονή", "Άμεση απάντηση"],
             ["#ΕνσωμάτωσηPMS", "Ημερολόγιο & κρατήσεις"],
             ["#4Εβδομάδες", "Γρήγορα έτοιμο"]],
  },
  "ko": {
    "tags": [["#24/7", "밤과 일요일에도"],
             ["#30언어", "해외 손님 환영"],
             ["#GDPR", "독일 호스팅"],
             ["#대기없음", "즉시 응답"],
             ["#PMS연동", "캘린더 & 예약"],
             ["#4주라이브", "빠르게 가동"]],
  },
  "vi": {
    "tags": [["#24/7", "Cả đêm và Chủ nhật"],
             ["#30NgônNgữ", "Chào đón khách quốc tế"],
             ["#GDPR", "Lưu trữ tại Đức"],
             ["#KhôngChờ", "Trả lời ngay"],
             ["#TíchHợpPMS", "Lịch & đặt chỗ"],
             ["#4TuầnLive", "Sẵn sàng nhanh"]],
  },
  "th": {
    "tags": [["#24/7", "ทั้งกลางคืนและวันอาทิตย์"],
             ["#30ภาษา", "ยินดีต้อนรับแขกต่างชาติ"],
             ["#GDPR", "โฮสต์ในเยอรมนี"],
             ["#ไม่มีคิว", "ตอบทันที"],
             ["#เชื่อมPMS", "ปฏิทินและการจอง"],
             ["#4สัปดาห์", "พร้อมใช้งานเร็ว"]],
  },
}


def main():
    for locale, tr in T.items():
        path = os.path.join(ROOT, f"{locale}.json")
        with open(path, encoding="utf-8") as f:
            d = json.load(f)

        d.setdefault("value_props", {})
        d["value_props"]["tags"] = [{"label": l, "desc": desc} for l, desc in tr["tags"]]

        with open(path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(d, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(f"OK {locale}: tags (6) written; hero scenarios left untouched")


if __name__ == "__main__":
    main()
