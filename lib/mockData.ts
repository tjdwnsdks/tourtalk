/**
 * Mock 데이터 - PRD 262-272, 274-283, 302-341
 * 실제 API 호출 없이 가짜 번역/투어/참여자 데이터
 */

import type { LanguageCode, Tour, Participant } from "@/types";

/** 번역 문구 10개 세트 (8개 언어) - PRD 262-272 */
export const translationPhrases: Record<string, Record<string, string>> = {
  "안녕하세요, 경복궁에 오신 것을 환영합니다": {
    ko: "안녕하세요, 경복궁에 오신 것을 환영합니다",
    en: "Welcome to Gyeongbokgung Palace",
    vi: "Xin chào, chào mừng đến với Gyeongbokgung",
    "zh-CN": "欢迎来到景福宫",
    "zh-TW": "歡迎來到景福宮",
    ja: "景福宮へようこそ",
    th: "ยินดีต้อนรับสู่พระราชวังเคียงบกกุง",
    id: "Selamat datang di Istana Gyeongbokgung",
  },
  "10분 후 정문에서 만나요": {
    ko: "10분 후 정문에서 만나요",
    en: "Let's meet at the main gate in 10 minutes",
    vi: "Chúng ta sẽ gặp nhau ở cổng chính sau 10 phút",
    "zh-CN": "10分钟后在正门见面",
    "zh-TW": "10分鐘後在正門見面",
    ja: "10分後に正門で会いましょう",
    th: "พบกันที่ประตูหลักใน 10 นาที",
    id: "Mari bertemu di gerbang utama dalam 10 menit",
  },
  "화장실은 오른쪽 건물에 있습니다": {
    ko: "화장실은 오른쪽 건물에 있습니다",
    en: "The restroom is in the building on the right",
    vi: "Nhà vệ sinh ở tòa nhà bên phải",
    "zh-CN": "洗手间在右边的建筑里",
    "zh-TW": "洗手間在右邊的建築裡",
    ja: "トイレは右側の建物にあります",
    th: "ห้องน้ำอยู่ในอาคารทางขวา",
    id: "Toilet ada di gedung sebelah kanan",
  },
  "지금부터 사진 촬영 시간입니다": {
    ko: "지금부터 사진 촬영 시간입니다",
    en: "It's time for photos now",
    vi: "Bây giờ là thời gian chụp ảnh",
    "zh-CN": "现在是拍照时间",
    "zh-TW": "現在是拍照時間",
    ja: "今から写真撮影の時間です",
    th: "ถึงเวลาถ่ายรูปแล้ว",
    id: "Sekarang waktunya foto",
  },
  "30분 후 점심 식사 예정입니다": {
    ko: "30분 후 점심 식사 예정입니다",
    en: "Lunch is scheduled in 30 minutes",
    vi: "Bữa trưa được lên lịch sau 30 phút",
    "zh-CN": "30分钟后预定午餐",
    "zh-TW": "30分鐘後預定午餐",
    ja: "30分後に昼食の予定です",
    th: "มีกำหนดรับประทานอาหารกลางวันใน 30 นาที",
    id: "Makan siang dijadwalkan dalam 30 menit",
  },
  "이곳은 근정전입니다": {
    ko: "이곳은 근정전입니다",
    en: "This is Geunjeongjeon Hall",
    vi: "Đây là Điện Geunjeongjeon",
    "zh-CN": "这里是勤政殿",
    "zh-TW": "這裡是勤政殿",
    ja: "ここは勤政殿です",
    th: "นี่คือพระที่นั่งกึนจองจอน",
    id: "Ini adalah Aula Geunjeongjeon",
  },
  "질문 있으시면 언제든 말씀하세요": {
    ko: "질문 있으시면 언제든 말씀하세요",
    en: "Please feel free to ask if you have any questions",
    vi: "Hãy thoải mái hỏi nếu bạn có câu hỏi",
    "zh-CN": "有问题请随时提问",
    "zh-TW": "有問題請隨時提問",
    ja: "質問があればいつでもおっしゃってください",
    th: "หากมีคำถามสามารถถามได้ตลอดเวลา",
    id: "Silakan bertanya jika ada pertanyaan",
  },
  "5분 후 버스 출발합니다": {
    ko: "5분 후 버스 출발합니다",
    en: "The bus will depart in 5 minutes",
    vi: "Xe buýt sẽ khởi hành sau 5 phút",
    "zh-CN": "巴士将在5分钟后出发",
    "zh-TW": "巴士將在5分鐘後出發",
    ja: "バスは5分後に出発します",
    th: "รถบัสจะออกเดินทางใน 5 นาที",
    id: "Bus akan berangkat dalam 5 menit",
  },
  "다음 장소로 이동하겠습니다": {
    ko: "다음 장소로 이동하겠습니다",
    en: "Let's move to the next location",
    vi: "Chúng ta sẽ di chuyển đến địa điểm tiếp theo",
    "zh-CN": "我们将前往下一个地点",
    "zh-TW": "我們將前往下一個地點",
    ja: "次の場所に移動します",
    th: "ไปยังสถานที่ถัดไป",
    id: "Mari pindah ke lokasi berikutnya",
  },
  "투어가 종료되었습니다. 감사합니다": {
    ko: "투어가 종료되었습니다. 감사합니다",
    en: "The tour has ended. Thank you",
    vi: "Tour đã kết thúc. Cảm ơn bạn",
    "zh-CN": "游览结束了。谢谢",
    "zh-TW": "遊覽結束了。謝謝",
    ja: "ツアーは終了しました。ありがとうございました",
    th: "ทัวร์สิ้นสุดแล้ว ขอบคุณ",
    id: "Tur telah berakhir. Terima kasih",
  },
};

/** 투어 제목 번역 데이터 */
export const tourNameTranslations: Record<string, Record<LanguageCode, string>> = {
  "경복궁 오전 투어": {
    ko: "경복궁 오전 투어",
    en: "Gyeongbokgung Morning Tour",
    vi: "Tour buổi sáng Gyeongbokgung",
    "zh-CN": "景福宫上午游",
    "zh-TW": "景福宮上午遊",
    ja: "景福宮午前ツアー",
    th: "ทัวร์เช้าพระราชวังเคียงบกกุง",
    id: "Tur pagi Gyeongbokgung",
  },
  "남산타워 야경 투어": {
    ko: "남산타워 야경 투어",
    en: "Namsan Tower Night View Tour",
    vi: "Tour cảnh đêm tháp Namsan",
    "zh-CN": "南山塔夜景游",
    "zh-TW": "南山塔夜景遊",
    ja: "南山タワー夜景ツアー",
    th: "ทัวร์ชมวิวกลางคืนหอคอยนัมซาน",
    id: "Tur pemandangan malam Menara Namsan",
  },
};

/** 가짜 번역: 한국어 원문 → 대상 언어 (미리 준비된 문구만) */
export function fakeTranslate(
  koreanText: string,
  targetLanguage: LanguageCode
): string {
  const key = Object.keys(translationPhrases).find(
    (k) => k === koreanText || translationPhrases[k]?.ko === koreanText
  );
  if (!key) return koreanText;
  const row = translationPhrases[key];
  const langKey = targetLanguage in row ? targetLanguage : "en";
  return (row[langKey] ?? row.en ?? koreanText) as string;
}

/** 관광객용 빠른 메시지 프리셋 6개 (다국어) - PRD 274-283 */
export const quickRequestPresets: {
  ko: string;
  en: string;
  vi: string;
  "zh-CN": string;
  "zh-TW": string;
  ja: string;
  th?: string;
  id?: string;
}[] = [
  {
    ko: "🚻 화장실 어디 있나요?",
    en: "Where is the restroom?",
    vi: "Nhà vệ sinh ở đâu?",
    "zh-CN": "洗手间在哪里？",
    "zh-TW": "洗手間在哪裡？",
    ja: "トイレはどこですか？",
  },
  {
    ko: "📸 사진 찍어주세요",
    en: "Please take a photo",
    vi: "Chụp ảnh giúp tôi",
    "zh-CN": "请给我拍照",
    "zh-TW": "請給我拍照",
    ja: "写真を撮ってください",
  },
  {
    ko: "🤚 잠깐만요",
    en: "Wait a moment",
    vi: "Chờ một chút",
    "zh-CN": "等一下",
    "zh-TW": "等一下",
    ja: "ちょっと待って",
  },
  {
    ko: "❓ 질문이 있어요",
    en: "I have a question",
    vi: "Tôi có câu hỏi",
    "zh-CN": "我有问题",
    "zh-TW": "我有問題",
    ja: "質問があります",
  },
  {
    ko: "🤒 몸이 안 좋아요",
    en: "I don't feel well",
    vi: "Tôi không khỏe",
    "zh-CN": "我感觉不舒服",
    "zh-TW": "我感覺不舒服",
    ja: "体調が悪いです",
  },
  {
    ko: "🙋 도와주세요",
    en: "Please help me",
    vi: "Giúp tôi",
    "zh-CN": "请帮帮我",
    "zh-TW": "請幫幫我",
    ja: "助けてください",
  },
];

/** 가이드 빠른 메시지 (다국어) - PRD 837-841 */
export const guideQuickMessages: {
  ko: string;
  en: string;
  vi: string;
  "zh-CN": string;
  "zh-TW": string;
  ja: string;
  th?: string;
  id?: string;
}[] = [
  {
    ko: "📍 집합 장소 안내",
    en: "📍 Meeting point information",
    vi: "📍 Thông tin điểm tập trung",
    "zh-CN": "📍 集合地点信息",
    "zh-TW": "📍 集合地點資訊",
    ja: "📍 集合場所のご案内",
    th: "📍 ข้อมูลจุดนัดพบ",
    id: "📍 Informasi titik kumpul",
  },
  {
    ko: "🚌 버스 출발 10분전",
    en: "🚌 Bus departs in 10 minutes",
    vi: "🚌 Xe buýt khởi hành sau 10 phút",
    "zh-CN": "🚌 巴士10分钟后出发",
    "zh-TW": "🚌 巴士10分鐘後出發",
    ja: "🚌 バス出発10分前",
    th: "🚌 รถบัสออกเดินทางใน 10 นาที",
    id: "🚌 Bus berangkat dalam 10 menit",
  },
  {
    ko: "🍽️ 식사 시간",
    en: "🍽️ Meal time",
    vi: "🍽️ Thời gian ăn",
    "zh-CN": "🍽️ 用餐时间",
    "zh-TW": "🍽️ 用餐時間",
    ja: "🍽️ 食事の時間",
    th: "🍽️ เวลาอาหาร",
    id: "🍽️ Waktu makan",
  },
  {
    ko: "⏰ 자유 시간 30분",
    en: "⏰ Free time 30 minutes",
    vi: "⏰ Thời gian tự do 30 phút",
    "zh-CN": "⏰ 自由时间30分钟",
    "zh-TW": "⏰ 自由時間30分鐘",
    ja: "⏰ 自由時間30分",
    th: "⏰ เวลาว่าง 30 นาที",
    id: "⏰ Waktu bebas 30 menit",
  },
  {
    ko: "⚠️ 긴급 공지",
    en: "⚠️ Urgent notice",
    vi: "⚠️ Thông báo khẩn cấp",
    "zh-CN": "⚠️ 紧急通知",
    "zh-TW": "⚠️ 緊急通知",
    ja: "⚠️ 緊急のお知らせ",
    th: "⚠️ ประกาศเร่งด่วน",
    id: "⚠️ Pemberitahuan mendesak",
  },
];

/** 가짜 투어 목록 - PRD 302-336 */
export const fakeTours: Tour[] = [
  {
    id: "A1234",
    name: "경복궁 오전 투어",
    nameTranslations: tourNameTranslations["경복궁 오전 투어"],
    guideId: "guide1",
    guideName: "Minsu Kim",
    date: "2025-02-10",
    startTime: "09:00",
    participants: 15,
    maxParticipants: 30,
    status: "active",
    languages: { ko: 5, en: 4, vi: 3, zh: 2, ja: 1 },
  },
  {
    id: "B5678",
    name: "남산타워 야경 투어",
    nameTranslations: tourNameTranslations["남산타워 야경 투어"],
    guideId: "guide1",
    guideName: "Minsu Kim",
    date: "2025-02-10",
    startTime: "18:00",
    participants: 12,
    maxParticipants: 25,
    status: "waiting",
    languages: { ko: 4, en: 5, vi: 2, zh: 1, ja: 0 },
  },
];

/** 가짜 참여자 30명 - PRD 338-341. tourId: A1234 15명, B5678 12명, 미배정 3명 */
export const fakeParticipants: Participant[] = [
  { id: "p1", name: "Nguyen Van A", email: "a@v.com", language: "vi", languageName: "베트남어", flag: "🇻🇳", isOnline: true, joinedAt: "", tourId: "A1234" },
  { id: "p2", name: "Tran Thi B", email: "b@v.com", language: "vi", languageName: "베트남어", flag: "🇻🇳", isOnline: true, joinedAt: "", tourId: "A1234" },
  { id: "p3", name: "Le Van C", email: "c@v.com", language: "vi", languageName: "베트남어", flag: "🇻🇳", isOnline: false, joinedAt: "", tourId: "A1234" },
  { id: "p4", name: "Pham Thi D", email: "d@v.com", language: "vi", languageName: "베트남어", flag: "🇻🇳", isOnline: true, joinedAt: "", tourId: "A1234" },
  { id: "p5", name: "Hoang Van E", email: "e@v.com", language: "vi", languageName: "베트남어", flag: "🇻🇳", isOnline: true, joinedAt: "", tourId: "A1234" },
  { id: "p6", name: "Vo Thi F", email: "f@v.com", language: "vi", languageName: "베트남어", flag: "🇻🇳", isOnline: true, joinedAt: "", tourId: "A1234" },
  { id: "p7", name: "Do Van G", email: "g@v.com", language: "vi", languageName: "베트남어", flag: "🇻🇳", isOnline: false, joinedAt: "", tourId: "A1234" },
  { id: "p8", name: "Bui Thi H", email: "h@v.com", language: "vi", languageName: "베트남어", flag: "🇻🇳", isOnline: true, joinedAt: "", tourId: "A1234" },
  { id: "p9", name: "Dang Van I", email: "i@v.com", language: "vi", languageName: "베트남어", flag: "🇻🇳", isOnline: true, joinedAt: "", tourId: "A1234" },
  { id: "p10", name: "Ngo Thi J", email: "j@v.com", language: "vi", languageName: "베트남어", flag: "🇻🇳", isOnline: true, joinedAt: "", tourId: "A1234" },
  { id: "p11", name: "John Smith", email: "j@e.com", language: "en", languageName: "English", flag: "🇺🇸", isOnline: true, joinedAt: "", tourId: "A1234" },
  { id: "p12", name: "Sarah Lee", email: "s@e.com", language: "en", languageName: "English", flag: "🇺🇸", isOnline: true, joinedAt: "", tourId: "A1234" },
  { id: "p13", name: "Michael Brown", email: "m@e.com", language: "en", languageName: "English", flag: "🇺🇸", isOnline: true, joinedAt: "", tourId: "A1234" },
  { id: "p14", name: "Emily Davis", email: "e@e.com", language: "en", languageName: "English", flag: "🇺🇸", isOnline: false, joinedAt: "", tourId: "A1234" },
  { id: "p15", name: "James Wilson", email: "w@e.com", language: "en", languageName: "English", flag: "🇺🇸", isOnline: true, joinedAt: "", tourId: "A1234" },
  { id: "p16", name: "Emma Johnson", email: "em@e.com", language: "en", languageName: "English", flag: "🇺🇸", isOnline: true, joinedAt: "", tourId: "B5678" },
  { id: "p17", name: "David Miller", email: "d@e.com", language: "en", languageName: "English", flag: "🇺🇸", isOnline: true, joinedAt: "", tourId: "B5678" },
  { id: "p18", name: "Olivia Taylor", email: "o@e.com", language: "en", languageName: "English", flag: "🇺🇸", isOnline: true, joinedAt: "", tourId: "B5678" },
  { id: "p19", name: "김철수", email: "k1@ko.com", language: "ko", languageName: "한국어", flag: "🇰🇷", isOnline: true, joinedAt: "", tourId: "B5678" },
  { id: "p20", name: "박영희", email: "k2@ko.com", language: "ko", languageName: "한국어", flag: "🇰🇷", isOnline: true, joinedAt: "", tourId: "B5678" },
  { id: "p21", name: "이민수", email: "k3@ko.com", language: "ko", languageName: "한국어", flag: "🇰🇷", isOnline: false, joinedAt: "", tourId: "B5678" },
  { id: "p22", name: "정수진", email: "k4@ko.com", language: "ko", languageName: "한국어", flag: "🇰🇷", isOnline: true, joinedAt: "", tourId: "B5678" },
  { id: "p23", name: "최동훈", email: "k5@ko.com", language: "ko", languageName: "한국어", flag: "🇰🇷", isOnline: true, joinedAt: "", tourId: "B5678" },
  { id: "p24", name: "李明", email: "z1@zh.com", language: "zh-CN", languageName: "简体中文", flag: "🇨🇳", isOnline: true, joinedAt: "", tourId: "B5678" },
  { id: "p25", name: "王芳", email: "z2@zh.com", language: "zh-CN", languageName: "简体中文", flag: "🇨🇳", isOnline: true, joinedAt: "", tourId: "B5678" },
  { id: "p26", name: "张伟", email: "z3@zh.com", language: "zh-CN", languageName: "简体中文", flag: "🇨🇳", isOnline: false, joinedAt: "", tourId: "B5678" },
  { id: "p27", name: "刘娜", email: "z4@zh.com", language: "zh-CN", languageName: "简体中文", flag: "🇨🇳", isOnline: true, joinedAt: "", tourId: "B5678" },
  { id: "p28", name: "陳大文", email: "zt1@zh.com", language: "zh-TW", languageName: "繁體中文", flag: "🇹🇼", isOnline: true, joinedAt: "" },
  { id: "p29", name: "林小美", email: "zt2@zh.com", language: "zh-TW", languageName: "繁體中文", flag: "🇹🇼", isOnline: true, joinedAt: "" },
  { id: "p30", name: "佐藤太郎", email: "ja@jp.com", language: "ja", languageName: "日本語", flag: "🇯🇵", isOnline: true, joinedAt: "" },
  { id: "p31", name: "Kevin Park", email: "k@v.com", language: "en", languageName: "English", flag: "🇺🇸", isOnline: true, joinedAt: "" },
  { id: "p32", name: "Linda Chen", email: "l@v.com", language: "zh-CN", languageName: "简体中文", flag: "🇨🇳", isOnline: true, joinedAt: "" },
  { id: "p33", name: "Mark Johnson", email: "m@v.com", language: "en", languageName: "English", flag: "🇺🇸", isOnline: false, joinedAt: "" },
  { id: "p34", name: "Nina Petrova", email: "n@v.com", language: "en", languageName: "English", flag: "🇷🇺", isOnline: true, joinedAt: "" },
  { id: "p35", name: "Oscar Martinez", email: "o@v.com", language: "en", languageName: "English", flag: "🇪🇸", isOnline: true, joinedAt: "" },
  { id: "p36", name: "Patricia Wong", email: "p@v.com", language: "zh-CN", languageName: "简体中文", flag: "🇨🇳", isOnline: true, joinedAt: "" },
  { id: "p37", name: "Quang Nguyen", email: "q@v.com", language: "vi", languageName: "베트남어", flag: "🇻🇳", isOnline: true, joinedAt: "" },
  { id: "p38", name: "Rachel Kim", email: "r@v.com", language: "ko", languageName: "한국어", flag: "🇰🇷", isOnline: false, joinedAt: "" },
  { id: "p39", name: "Somchai Prasert", email: "s@v.com", language: "th", languageName: "ภาษาไทย", flag: "🇹🇭", isOnline: true, joinedAt: "" },
  { id: "p40", name: "Tanaka Yuki", email: "t@v.com", language: "ja", languageName: "日本語", flag: "🇯🇵", isOnline: true, joinedAt: "" },
  { id: "p41", name: "Umar Hassan", email: "u@v.com", language: "id", languageName: "Bahasa Indonesia", flag: "🇮🇩", isOnline: true, joinedAt: "" },
  { id: "p42", name: "Victoria Li", email: "v@v.com", language: "zh-TW", languageName: "繁體中文", flag: "🇹🇼", isOnline: true, joinedAt: "" },
  { id: "p43", name: "William Zhang", email: "w@v.com", language: "en", languageName: "English", flag: "🇺🇸", isOnline: false, joinedAt: "" },
  { id: "p44", name: "Xiao Ming", email: "x@v.com", language: "zh-CN", languageName: "简体中文", flag: "🇨🇳", isOnline: true, joinedAt: "" },
  { id: "p45", name: "Yuki Yamamoto", email: "y@v.com", language: "ja", languageName: "日本語", flag: "🇯🇵", isOnline: true, joinedAt: "" },
  { id: "p46", name: "Zara Ahmed", email: "z@v.com", language: "en", languageName: "English", flag: "🇦🇪", isOnline: true, joinedAt: "" },
];

/** 투어별 실제 참여자 목록 (표시 인원수와 참여자 탭/통계 일치용) */
export function getParticipantsForTour(tourId: string): Participant[] {
  return fakeParticipants.filter((p) => p.tourId === tourId);
}

/** 회원 검색용 가짜 사용자 DB (이메일 정확 일치용) */
export const fakeUserDatabase = [
  { id: "u1", name: "Kim Young-hee", email: "kim@email.com", isMember: true },
  { id: "u2", name: "김엄마", email: "mom@email.com", isMember: true },
];

/**
 * 투어 이름을 현재 언어로 번역
 */
export function getTourName(tour: Tour, language: LanguageCode): string {
  if (tour.nameTranslations && tour.nameTranslations[language]) {
    return tour.nameTranslations[language];
  }
  if (tour.nameTranslations && tour.nameTranslations.en) {
    return tour.nameTranslations.en;  // 영어 fallback
  }
  return tour.name;  // 번역 없으면 기본 이름
}
