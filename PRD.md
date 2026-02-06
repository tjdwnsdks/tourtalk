# PRD.md - TourTalk MVP 0

## 📋 프로젝트 개요

### 프로젝트명
**TourTalk** - AI 기반 다국어 실시간 통역 투어 가이드 플랫폼

### 버전
MVP 0 (프로토타입)

### 작성일
2025-02-06

### 작성자
Jun

---

## 🎯 프로젝트 목표

### MVP 0 단계 목표
실제 기능 구현 없이 **화면 구성과 사용자 플로우만 시각화**하여 잠재 사용자들에게 서비스 컨셉을 검증받는다.

### 주요 목적
1. ✅ 화면 구성 및 UI/UX 검증
2. ✅ 사용자 여정(User Flow) 시각화
3. ✅ 화면 간 전환 및 네비게이션 확인
4. ✅ 초기 사용자 피드백 수집
5. ✅ URL 공유를 통한 원격 테스트

### 제외 사항 (MVP 1 이후)
- ❌ 실제 소셜 로그인 연동
- ❌ 실제 번역/통역 API 연동
- ❌ 실시간 메시징 (WebSocket)
- ❌ 데이터베이스 연동
- ❌ 실제 푸시 알림
- ❌ 결제 시스템

---

## 👥 타겟 사용자

### 1차 타겟: 가이드
- 한국 내 투어 가이드
- 다국적 관광객을 동시 인솔
- 다국어 구사 불가능
- 스마트폰 사용 가능

### 2차 타겟: 관광객
- 한국 방문 외국인 관광객
- 모국어로 투어 정보 수신 희망
- 영어 소통 어려움
- 스마트폰 사용 가능

---

## 🎨 화면 구성

### 📊 MVP 최종 화면 구성표 (8개 화면)

| 화면 번호 | 화면명 | 역할 | 주요 기능 | 상태 |
|---------|--------|------|----------|------|
| **0️⃣** | 로그인/회원가입 | 공통 | 소셜 로그인 (Google, Kakao), 프로필 입력 | ✅ 필수 |
| **1️⃣** | 역할 선택 | 공통 | 가이드/관광객 선택, 햄버거 메뉴, 언어 전환 | ✅ 필수 |
| **2️⃣** | 긴급 연락망 설정 | 공통 | 연락처 추가/관리 (최대 5명), 회원 검색 | ✅ 필수 |
| **3️⃣** | 가이드 홈 | 가이드 | 투어 목록, 새 투어 만들기, 히스토리 | ✅ 필수 |
| **4️⃣** | 투어 생성 | 가이드 | 투어 정보 입력, 코드/QR 생성, 공유 | ✅ 필수 |
| **5️⃣** | 투어 관리 | 가이드 | 메시지/참여자/통계 탭, 실시간 관리 | ✅ 필수 |
| **6️⃣** | 투어 참여 | 관광객 | 코드 입력, QR 스캔, 투어 목록 | ✅ 필수 |
| **7️⃣** | 관광객 메인 | 관광객 | 메시지 수신, 음성 재생, 빠른 요청 | ✅ 필수 |
| **8️⃣** | 빠른 요청 | 관광객 | 프리셋 버튼, 자유 입력, 긴급 알림 | ✅ 필수 |

**총 화면 수: 8개**  
**공통: 3개 | 가이드: 3개 | 관광객: 3개** (1️⃣ 역할 선택에서 분기)

---

### 전체 화면 목록 (8개)

#### 공통 플로우
- **0️⃣ 로그인/회원가입 화면**
  - 소셜 로그인 (Google, Kakao) UI
  - 첫 로그인 시 프로필 입력 (이름, 전화번호 선택, 언어)

- **1️⃣ 역할 선택 화면**
  - 가이드 / 관광객 선택
  - 햄버거 메뉴 (☰)
  - 언어 선택 버튼 (🌐)

- **2️⃣ 긴급 연락망 설정 화면**
  - 회원 검색 (이메일 기반)
  - 이메일 직접 입력
  - 등록된 연락처 관리 (최대 5명)
  - TourTalk 회원/비회원 구분 표시

#### 가이드 플로우
- **3️⃣ 가이드 메인 화면**
  - 활성 투어 목록 (진행중/대기중)
  - 새 투어 만들기 버튼
  - 완료된 투어 히스토리

- **4️⃣ 투어 생성 화면**
  - 투어 정보 입력 (이름, 날짜, 시간, 예상 인원)
  - 자동 다국어 지원 안내
  - 투어 코드/QR 자동 생성
  - 공유 기능 (카카오톡, 문자)

- **5️⃣ 가이드 투어 관리 화면**
  - **탭 1: 메시지** (음성/텍스트 입력 UI, 빠른 메시지, 받은 메시지)
  - **탭 2: 참여자** (언어별 그룹, 초대/확인/추방 UI)
  - **탭 3: 통계** (언어별 분포, 접속 상태, 활동 통계)

#### 관광객 플로우
- **6️⃣ 관광객 투어 참여 화면**
  - 투어 코드 입력 (6자리)
  - QR 코드 스캔 UI
  - 내 투어 목록

- **7️⃣ 관광객 메인 화면**
  - 실시간 메시지 수신 UI (번역된 텍스트)
  - 음성 재생 버튼 (🔊)
  - 빠른 요청 버튼 (질문, 사진)
  - 긴급 버튼 (🆘)

- **8️⃣ 빠른 요청 화면**
  - 프리셋 버튼 (화장실, 사진, 질문 등)
  - 자유 입력 (텍스트/음성)
  - 긴급 상황 알리기

---

## 🎮 인터랙션 요구사항

### MVP 0 목표
실제 API 연동 없이 **"작동하는 것처럼 보이는"** 인터랙티브 프로토타입 구현

### 핵심 원칙
- ✅ 사용자가 **"통역 기능이 있다"**는 것을 명확히 인식
- ✅ 화면 전환이 **자연스럽고 즉각적**
- ✅ 로딩 상태가 **실시간처럼** 느껴짐
- ❌ 실제 API 호출 없음 (가짜 데이터 사용)

---

### 필수 인터랙션 (5개)

#### 1️⃣ 화면 전환 ⭐⭐⭐
**목적:** 사용자 플로우 시각화

**동작:**
- 버튼 클릭 → 다음 화면으로 이동
- 뒤로가기 버튼 → 이전 화면
- URL 변경 (React Router)

**예시:**
```
[투어 시작하기] 클릭 
   ↓
가이드 메인 화면으로 이동
```

---

#### 2️⃣ 가짜 번역 기능 ⭐⭐⭐⭐⭐ (핵심!)
**목적:** 실시간 통역 기능 시연

**동작 시나리오:**

**가이드 화면에서:**
```
1. 가이드가 메시지 입력
   "10분 후 정문에서 만나요"
   
2. [전송] 버튼 클릭

3. 로딩 표시 (0.5초)
   "전송 중... 💬"
   
4. 완료 토스트
   "✅ 메시지 전송 완료!"
```

**관광객 화면에서 (자동):**
```
1. 0.5초 후 자동으로 번역된 메시지 표시

2. 사용자 언어에 따라 다르게 표시:
   🇻🇳 베트남어: "Chúng ta sẽ gặp nhau ở cổng chính sau 10 phút"
   🇺🇸 영어: "Let's meet at the main gate in 10 minutes"
   🇨🇳 중국어: "10分钟后在正门见面"
   🇯🇵 일본어: "10分後に正門で会いましょう"

3. [🔊 듣기] 버튼 활성화
```

**구현 방법:**
- 미리 번역된 문구 세트 사용 (실제 API 호출 X)
- setTimeout으로 0.5초 딜레이
- 관광객 선택 언어에 맞춰 표시

---

#### 3️⃣ 로딩 애니메이션 ⭐⭐⭐⭐
**목적:** 실시간 처리 중이라는 느낌

**적용 위치:**
- 메시지 전송 시
- 번역 처리 시
- QR 스캔 시
- 투어 생성 시

**디자인:**
```
💬 번역 중...
🔄 전송 중...
📷 스캔 중...
```

**시간:** 0.3초 ~ 1초

---

#### 4️⃣ 토스트 알림 ⭐⭐⭐
**목적:** 액션에 대한 즉각적인 피드백

**사용 케이스:**
```
✅ "메시지 전송 완료!"
✅ "투어가 생성되었습니다!"
✅ "투어 참여 완료!"
✅ "긴급 알림 전송됨"
❌ "투어 코드를 확인해주세요"
```

**위치:** 화면 상단 또는 하단
**지속 시간:** 2-3초

---

#### 5️⃣ 언어별 화면 차이 ⭐⭐⭐⭐
**목적:** 다국어 지원 시연

**동작:**
- 사용자가 언어 선택 (🌐 버튼)
- 전체 UI가 해당 언어로 변경
- 메시지도 해당 언어로 표시

**지원 언어 (MVP 0):**
```
🇰🇷 한국어 (기본)
🇺🇸 English
🇻🇳 Tiếng Việt
🇨🇳 简体中文 (중국어 간체)
🇹🇼 繁體中文 (중국어 번체)
🇯🇵 日本語
🇹🇭 ภาษาไทย (태국어)
🇮🇩 Bahasa Indonesia (인도네시아어)
```

---

### 선택적 인터랙션 (있으면 좋음)

#### 6️⃣ 타이핑 효과 ⭐⭐
메시지가 한 글자씩 나타나는 효과

#### 7️⃣ 음성 재생 애니메이션 ⭐⭐
[🔊 듣기] 버튼 클릭 시:
- "재생 중..." 표시
- 2-3초 후 "재생 완료"
- 실제 음성 재생은 없음

#### 8️⃣ QR 스캔 시뮬레이션 ⭐
[QR 코드 스캔] 버튼 클릭 시:
- 카메라 UI 표시
- 1초 로딩
- "투어 코드 인식됨!" 

#### 9️⃣ 실시간 참여자 변화 ⭐
통계 화면에서:
- 5초마다 참여자 수 변경 (15명 → 16명 → 17명)
- 접속 상태 변화 (🟢 → 🔴)

---

### 📝 미리 준비할 가짜 데이터

#### 1. 번역 문구 세트 (10개)

| 한국어 | 영어 | 베트남어 | 중국어 간체 | 중국어 번체 | 일본어 | 태국어 | 인도네시아어 |
|--------|------|----------|------------|------------|--------|--------|------------|
| 안녕하세요, 경복궁에 오신 것을 환영합니다 | Welcome to Gyeongbokgung Palace | Xin chào, chào mừng đến với Gyeongbokgung | 欢迎来到景福宫 | 歡迎來到景福宮 | 景福宮へようこそ | ยินดีต้อนรับสู่พระราชวังเคียงบกกุง | Selamat datang di Istana Gyeongbokgung |
| 10분 후 정문에서 만나요 | Let's meet at the main gate in 10 minutes | Chúng ta sẽ gặp nhau ở cổng chính sau 10 phút | 10分钟后在正门见面 | 10分鐘後在正門見面 | 10分後に正門で会いましょう | พบกันที่ประตูหลักใน 10 นาที | Mari bertemu di gerbang utama dalam 10 menit |
| 화장실은 오른쪽 건물에 있습니다 | The restroom is in the building on the right | Nhà vệ sinh ở tòa nhà bên phải | 洗手间在右边的建筑里 | 洗手間在右邊的建築裡 | トイレは右側の建物にあります | ห้องน้ำอยู่ในอาคารทางขวา | Toilet ada di gedung sebelah kanan |
| 지금부터 사진 촬영 시간입니다 | It's time for photos now | Bây giờ là thời gian chụp ảnh | 现在是拍照时间 | 現在是拍照時間 | 今から写真撮影の時間です | ถึงเวลาถ่ายรูปแล้ว | Sekarang waktunya foto |
| 30분 후 점심 식사 예정입니다 | Lunch is scheduled in 30 minutes | Bữa trưa được lên lịch sau 30 phút | 30分钟后预定午餐 | 30分鐘後預定午餐 | 30分後に昼食の予定です | มีกำหนดรับประทานอาหารกลางวันใน 30 นาที | Makan siang dijadwalkan dalam 30 menit |
| 이곳은 근정전입니다 | This is Geunjeongjeon Hall | Đây là Điện Geunjeongjeon | 这里是勤政殿 | 這裡是勤政殿 | ここは勤政殿です | นี่คือพระที่นั่งกึนจองจอน | Ini adalah Aula Geunjeongjeon |
| 질문 있으시면 언제든 말씀하세요 | Please feel free to ask if you have any questions | Hãy thoải mái hỏi nếu bạn có câu hỏi | 有问题请随时提问 | 有問題請隨時提問 | 質問があればいつでもおっしゃってください | หากมีคำถามสามารถถามได้ตลอดเวลา | Silakan bertanya jika ada pertanyaan |
| 5분 후 버스 출발합니다 | The bus will depart in 5 minutes | Xe buýt sẽ khởi hành sau 5 phút | 巴士将在5分钟后出发 | 巴士將在5分鐘後出發 | バスは5分後に出発します | รถบัสจะออกเดินทางใน 5 นาที | Bus akan berangkat dalam 5 menit |
| 다음 장소로 이동하겠습니다 | Let's move to the next location | Chúng ta sẽ di chuyển đến địa điểm tiếp theo | 我们将前往下一个地点 | 我們將前往下一個地點 | 次の場所に移動します | ไปยังสถานที่ถัดไป | Mari pindah ke lokasi berikutnya |
| 투어가 종료되었습니다. 감사합니다 | The tour has ended. Thank you | Tour đã kết thúc. Cảm ơn bạn | 游览结束了。谢谢 | 遊覽結束了。謝謝 | ツアーは終了しました。ありがとうございました | ทัวร์สิ้นสุดแล้ว ขอบคุณ | Tur telah berakhir. Terima kasih |

#### 2. 빠른 메시지 버튼 (관광객용)

| 한국어 | 영어 | 베트남어 | 중국어 간체 | 중국어 번체 | 일본어 |
|--------|------|----------|------------|------------|--------|
| 🚻 화장실 어디 있나요? | Where is the restroom? | Nhà vệ sinh ở đâu? | 洗手间在哪里？ | 洗手間在哪裡？ | トイレはどこですか？ |
| 📸 사진 찍어주세요 | Please take a photo | Chụp ảnh giúp tôi | 请给我拍照 | 請給我拍照 | 写真を撮ってください |
| 🤚 잠깐만요 | Wait a moment | Chờ một chút | 等一下 | 等一下 | ちょっと待って |
| ❓ 질문이 있어요 | I have a question | Tôi có câu hỏi | 我有问题 | 我有問題 | 質問があります |
| 🤒 몸이 안 좋아요 | I don't feel well | Tôi không khỏe | 我感觉不舒服 | 我感覺不舒服 | 体調が悪いです |
| 🙋 도와주세요 | Please help me | Giúp tôi | 请帮帮我 | 請幫幫我 | 助けてください |

#### 3. 가짜 투어 데이터

```javascript
const fakeTours = [
  {
    id: "A1234",
    name: "경복궁 오전 투어",
    guide: "김민수",
    date: "2025-02-10",
    time: "09:00",
    participants: 15,
    maxParticipants: 30,
    status: "진행중",
    languages: {
      ko: 5,
      en: 4,
      vi: 3,
      zh: 2,
      ja: 1
    }
  },
  {
    id: "B5678",
    name: "남산타워 야경 투어",
    guide: "김민수",
    date: "2025-02-10",
    time: "18:00",
    participants: 12,
    maxParticipants: 25,
    status: "대기중",
    languages: {
      ko: 4,
      en: 5,
      vi: 2,
      zh: 1,
      ja: 0
    }
  }
];
```

#### 4. 가짜 참여자 데이터 (30명)

```javascript
const fakeParticipants = [
  // 베트남어 (10명)
  { name: "Nguyen Van A", language: "vi", status: "online" },
  { name: "Tran Thi B", language: "vi", status: "online" },
  { name: "Le Van C", language: "vi", status: "offline" },
  { name: "Pham Thi D", language: "vi", status: "online" },
  { name: "Hoang Van E", language: "vi", status: "online" },
  { name: "Vo Thi F", language: "vi", status: "online" },
  { name: "Do Van G", language: "vi", status: "offline" },
  { name: "Bui Thi H", language: "vi", status: "online" },
  { name: "Dang Van I", language: "vi", status: "online" },
  { name: "Ngo Thi J", language: "vi", status: "online" },
  
  // 영어 (8명)
  { name: "John Smith", language: "en", status: "online" },
  { name: "Sarah Lee", language: "en", status: "online" },
  { name: "Michael Brown", language: "en", status: "online" },
  { name: "Emily Davis", language: "en", status: "offline" },
  { name: "James Wilson", language: "en", status: "online" },
  { name: "Emma Johnson", language: "en", status: "online" },
  { name: "David Miller", language: "en", status: "online" },
  { name: "Olivia Taylor", language: "en", status: "online" },
  
  // 한국어 (5명)
  { name: "김철수", language: "ko", status: "online" },
  { name: "박영희", language: "ko", status: "online" },
  { name: "이민수", language: "ko", status: "offline" },
  { name: "정수진", language: "ko", status: "online" },
  { name: "최동훈", language: "ko", status: "online" },
  
  // 중국어 간체 (4명)
  { name: "李明", language: "zh-CN", status: "online" },
  { name: "王芳", language: "zh-CN", status: "online" },
  { name: "张伟", language: "zh-CN", status: "offline" },
  { name: "刘娜", language: "zh-CN", status: "online" },
  
  // 중국어 번체 (2명)
  { name: "陳大文", language: "zh-TW", status: "online" },
  { name: "林小美", language: "zh-TW", status: "online" },
  
  // 일본어 (1명)
  { name: "佐藤太郎", language: "ja", status: "online" }
];

// 언어별 분포
const languageDistribution = {
  vi: 10,    // 33.3%
  en: 8,     // 26.7%
  ko: 5,     // 16.7%
  "zh-CN": 4, // 13.3%
  "zh-TW": 2, // 6.7%
  ja: 1      // 3.3%
};
```

---

### 🎬 시연 시나리오 (데모용)

#### 시나리오 1: 가이드 → 관광객 메시징

```
1. 가이드 화면
   - "10분 후 정문에서 만나요" 입력
   - [전송] 클릭
   - "전송 중..." 0.5초
   - "✅ 메시지 전송 완료!"

2. 관광객 화면 (베트남어 사용자)
   - 0.5초 후 자동으로 메시지 수신
   - "Chúng ta sẽ gặp nhau ở cổng chính sau 10 phút"
   - [🔊 듣기] 버튼 활성화
   - 클릭 시 "재생 중..." 2초
```

#### 시나리오 2: 긴급 알림

```
1. 관광객 화면
   - [🆘 긴급] 버튼 클릭
   - 확인 모달 표시
   - [전송] 클릭
   
2. 효과
   - "전송 중..." 1초
   - "✅ 긴급 알림 전송 완료!"
   
3. 가이드 화면 상단
   - 🔴 알림 뱃지 표시
   - "Nguyen님의 긴급 요청"
```

#### 시나리오 3: 투어 참여

```
1. 관광객 투어 참여 화면
   - 코드 "A1234" 입력
   - [참여하기] 클릭
   
2. 투어 정보 모달
   - "경복궁 오전 투어" 표시
   - [참여] 버튼 클릭
   
3. 로딩 및 완료
   - "참여 중..." 1초
   - "✅ 투어 참여 완료!"
   - 관광객 메인 화면으로 이동
```

---

## 📱 화면 와이어프레임 

0️⃣ 로그인/회원가입 화면
┌─────────────────────────┐
│                         │
│      TourTalk           │
│      🌏 🗣️ 💬          │
│                         │
│   다국어 실시간 통역    │
│   투어 가이드 플랫폼    │
│                         │
│                         │
│                         │
│                         │
│                         │
│  ─────────────────────  │
│                         │
│  [🌐 Google로 시작하기] │
│                         │
│  [💬 카카오로 시작하기] │
│                         │
│                         │
│  ─────────────────────  │
│                         │
│  로그인 시 서비스 이용약관│
│  및 개인정보처리방침에   │
│  동의하는 것으로 간주됩니다│
│                         │
└─────────────────────────┘
↓ (첫 로그인 시)
┌─────────────────────────┐
│ 환영합니다! 👋          │
├─────────────────────────┤
│                         │
│  처음 오셨네요!         │
│  프로필을 설정해주세요  │
│                         │
│  이름                   │
│  [홍길동___________]    │
│  (자동 입력됨)          │
│                         │
│  연락 방법 (선택)       │
│  [📧 이메일로만 사용]   │
│  [📱 전화번호 추가]     │
│                         │
│  전화번호 (선택사항)    │
│  [+82 10-1234-5678__]   │
│  💡 긴급 상황 대비용    │
│                         │
│  사용 언어              │
│  [🇰🇷 한국어 ▼]         │
│                         │
│ [다음]                  │
└─────────────────────────┘

1️⃣ 역할 선택 화면
┌─────────────────────────┐
│ ☰  TourTalk      🌐 한국어│
├─────────────────────────┤
│                         │
│  어떻게 이용하시나요?   │
│                         │
│ ┌─────────────────────┐ │
│ │                     │ │
│ │       🎤            │ │
│ │                     │ │
│ │    투어 가이드       │ │
│ │                     │ │
│ │  투어를 진행하고     │ │
│ │  관광객을 인솔합니다 │ │
│ │                     │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │                     │ │
│ │       👥            │ │
│ │                     │ │
│ │    관광객           │ │
│ │                     │ │
│ │  투어에 참여하고     │ │
│ │  정보를 받습니다     │ │
│ │                     │ │
│ └─────────────────────┘ │
│                         │
│  💡 나중에 변경 가능    │
└─────────────────────────┘
↓ 햄버거 메뉴 (☰) 클릭 시
┌─────────────────────────┐
│ ☰  TourTalk      🌐 한국어│
├─────────────────────────┤
│ ┌───────────────────┐   │
│ │ 🌐 Language       │   │
│ │ ⚙️ Settings       │   │
│ │ ❓ Help           │   │
│ │ 📧 Contact        │   │
│ └───────────────────┘   │
│                         │
│  (화면 내용...)         │
└─────────────────────────┘
↓ 언어 버튼 (🌐 한국어) 클릭 시
┌─────────────────────────┐
│  언어 선택              │
├─────────────────────────┤
│                         │
│  자주 사용되는 언어      │
│                         │
│  [🇰🇷 한국어 - Korean]  │
│  [🇺🇸 English]          │
│  [🇻🇳 Tiếng Việt]       │
│  [🇨🇳 简体中文 - 간체]  │
│  [🇹🇼 繁體中文 - 번체]  │
│  [🇯🇵 日本語 - Japanese] │
│                         │
│  더 많은 언어            │
│  [▼ 전체 보기]          │
│                         │
│ [확인]                  │
└─────────────────────────┘

2️⃣ 긴급 연락망 설정 화면 (🔒 보안 강화)
┌─────────────────────────┐
│ ← 긴급 연락망 설정  🌐  │
├─────────────────────────┤
│                         │
│  🆘 긴급 상황 시        │
│     연락받을 사람을     │
│     등록해주세요        │
│                         │
│  ─────────────────────  │
│                         │
│  회원 검색              │
│  [🔍 정확한 이메일 입력]│
│                         │
│  💡 정확한 이메일 주소만│
│     검색됩니다          │
│                         │
│  또는                   │
│                         │
│  [➕ 이메일 직접 추가]   │
│                         │
│  ─────────────────────  │
│                         │
│  등록된 연락처 (2/5)    │
│                         │
│  ┌───────────────────┐ │
│  │ 👤 김엄마          │ │
│  │ ✓ 회원            │ │
│  │ mom@email.com  [×]│ │
│  └───────────────────┘ │
│                         │
│  ┌───────────────────┐ │
│  │ 👤 John (친구)    │ │
│  │ 비회원            │ │
│  │ john@email.com [×]│ │
│  └───────────────────┘ │
│                         │
│  [나중에]    [완료]     │
└─────────────────────────┘
↓ [회원 검색] 선택 시 (🔒 보안 강화)
┌─────────────────────────┐
│ ← 회원 검색             │
├─────────────────────────┤
│                         │
│  이메일로 검색          │
│  ┌─────────────────┐   │
│  │ kim@email.com   │ 🔍│
│  └─────────────────┘   │
│                         │
│  ⚠️ 개인정보 보호를 위해│
│     정확히 일치하는     │
│     이메일만 검색됩니다 │
│                         │
│  검색 결과:             │
│                         │
│ ┌─────────────────────┐ │
│ │ 👤 Kim Young-hee    │ │
│ │ 📧 kim@email.com    │ │
│ │ ✅ TourTalk 회원    │ │
│ │        [추가하기]   │ │
│ └─────────────────────┘ │
│                         │
│  🔒 보안: minkim@email.com│
│     등 부분일치 결과는  │
│     표시되지 않습니다   │
│                         │
│  검색 결과가 없나요?    │
│  [📧 이메일 직접 추가]  │
│                         │
└─────────────────────────┘
↓ [이메일 직접 추가] 선택 시
┌─────────────────────────┐
│ ← 이메일로 추가         │
├─────────────────────────┤
│                         │
│  연락처 정보            │
│                         │
│  관계                   │
│  [엄마___________▼]     │
│                         │
│  이름                   │
│  [________________]     │
│                         │
│  이메일                 │
│  [________________]     │
│                         │
│  💡 TourTalk 미가입자는 │
│     이메일로만 알림     │
│     수신 가능합니다     │
│                         │
│ [취소]         [추가]   │
└─────────────────────────┘
↓ 추가 완료 후
┌─────────────────────────┐
│ ☰ 긴급 연락망 관리  🌐  │
├─────────────────────────┤
│                         │
│  등록된 연락처 (2/5)    │
│                         │
│ ┌─────────────────────┐ │
│ │ 👤 Kim Young-hee    │ │
│ │ 📧 kim@email.com    │ │
│ │ ✅ 앱 푸시 가능     │ │
│ │    관계: 엄마        │ │
│ │          [수정][삭제]│ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ 👤 외부 연락처      │ │
│ │ 📧 friend@email.com │ │
│ │ 📧 이메일만 가능    │ │
│ │    관계: 친구        │ │
│ │          [수정][삭제]│ │
│ └─────────────────────┘ │
│                         │
│ [➕ 새 연락처 추가]     │
│                         │
│ 💡 TourTalk 회원이면    │
│    앱 푸시 알림 가능    │
│    비회원은 이메일만    │
│                         │
│ ─────────────────────   │
│                         │
│ [완료]                  │
└─────────────────────────┘
↓ [완료] 클릭
┌─────────────────────────┐
│ ✅ 설정 완료!           │
├─────────────────────────┤
│                         │
│  모든 준비가 완료되었습니다│
│                         │
│  이제 TourTalk을        │
│  시작해보세요!          │
│                         │
│                         │
│ [시작하기]              │
└─────────────────────────┘

3️⃣ 가이드 홈 화면
┌─────────────────────────┐
│ ☰ TourTalk Guide  ⚙️ 🆘 │
├─────────────────────────┤
│                         │
│  안녕하세요, 김민수님!  │
│                         │
│  활성 투어              │
│                         │
│ ┌─────────────────────┐ │
│ │ 경복궁 오전 투어    │ │
│ │ #A1234              │ │
│ │ 👥 15/30명          │ │
│ │ 🟢 진행중           │ │
│ │ [투어 열기]         │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ 남산타워 오후 투어  │ │
│ │ #B5678              │ │
│ │ 👥 12/25명          │ │
│ │ ⏸️ 대기중           │ │
│ │ [투어 열기]         │ │
│ └─────────────────────┘ │
│                         │
│                         │
│ [➕ 새 투어 만들기]     │
│                         │
│ ─────────────────────   │
│                         │
│  완료된 투어 (3)        │
│  [더보기 ▼]            │
│                         │
└─────────────────────────┘

4️⃣ 투어 생성 화면 (가이드용)
┌─────────────────────────┐
│ ← 새 투어 만들기    🌐  │
├─────────────────────────┤
│                         │
│  투어 이름              │
│  [경복궁 오전 투어____] │
│                         │
│  투어 날짜              │
│  [2025-02-10 📅]        │
│                         │
│  시작 시간              │
│  [09:00 🕐]             │
│                         │
│  예상 인원              │
│  [○ ~10  ○ ~20         │
│   ● ~30  ○ 30+]        │
│                         │
│  💡 자동 다국어 지원    │
│     모든 참가자가       │
│     선택한 언어로       │
│     실시간 번역됩니다   │
│                         │
│ [투어 생성하기]          │
└─────────────────────────┘
↓ (생성 완료 후)
┌─────────────────────────┐
│ ✅ 투어 생성 완료!      │
├─────────────────────────┤
│                         │
│  관광객을 초대하세요    │
│                         │
│  투어 코드              │
│  ┌─────────────────┐   │
│  │    A1234        │   │
│  └─────────────────┘   │
│  [📋 복사하기]          │
│                         │
│  QR 코드                │
│  ┌─────────────────┐   │
│  │  ████  ██  ████ │   │
│  │  ██  ████  ██   │   │
│  │  ████  ██  ████ │   │
│  └─────────────────┘   │
│                         │
│  [💾 이미지 저장]       │
│  [📤 카카오톡 공유]     │
│  [📤 문자 발송]         │
│                         │
│ ─────────────────────   │
│                         │
│ [투어 시작하기]          │
└─────────────────────────┘

5️⃣ 가이드 투어 관리 화면
💬 메시지 탭
┌─────────────────────────┐
│ ← 경복궁 투어 (#A1234)  │
│         🔴 LIVE  ⚙️ 🆘  │
├─────────────────────────┤
│ [💬 메시지] [👥 참여자] [📊 통계]│
├─────────────────────────┤
│                         │
│ 📊 15/30명 🟢           │
│ 🇻🇳 10 🇺🇸 8 🇰🇷 5     │
│                         │
│ ─── 메시지 전송 ───     │
│                         │
│ [🎤 음성으로 안내하기]  │
│                         │
│ ┌─────────────────────┐ │
│ │ 텍스트 입력...      │ │
│ │ [전송]              │ │
│ └─────────────────────┘ │
│                         │
│ ─── 빠른 메시지 ───     │
│ [📍 집합 장소 안내]     │
│ [🚌 버스 출발 10분전]   │
│ [🍽️ 식사 시간]         │
│ [⏰ 자유 시간 30분]     │
│ [⚠️ 긴급 공지]         │
│                         │
│ ─── 받은 메시지 ───     │
│ 🔴 Nguyen: 화장실 어디?│
│    📍 근정전 옆  [답장] │
│                         │
│ 🟡 John: 사진 찍어주세요│
│    👍 알겠습니다 [답장] │
│                         │
└─────────────────────────┘
↓ [👥 참여자] 탭 클릭
┌─────────────────────────┐
│ ← 경복궁 투어 (#A1234)  │
│         🔴 LIVE  ⚙️ 🆘  │
├─────────────────────────┤
│ [💬 메시지] [👥 참여자] [📊 통계]│
├─────────────────────────┤
│                         │
│ 참여자 관리 (30/30)     │
│                         │
│ [➕ 참여자 초대하기]    │
│ [📋 명단 내보내기]      │
│                         │
│ ─── 언어별 그룹 ───     │
│                         │
│ 🇻🇳 베트남어 (10명) ▼  │
│ ┌─────────────────────┐ │
│ │ 🟢 Nguyen Van A     │ │
│ │    [💬] [🚫 추방]   │ │
│ ├─────────────────────┤ │
│ │ 🟢 Tran Thi B       │ │
│ │    [💬] [🚫 추방]   │ │
│ ├─────────────────────┤ │
│ │ 🔴 Le Van C         │ │
│ │    [💬] [🚫 추방]   │ │
│ │    (오프라인)        │ │
│ └─────────────────────┘ │
│                         │
│ 🇺🇸 English (8명) ▼    │
│ 🇰🇷 한국어 (5명) ▼     │
│ 🇨🇳 简体中文 (4명) ▼   │
│ 🇹🇼 繁體中文 (2명) ▼   │
│ 🇯🇵 日本語 (1명) ▼     │
│                         │
│ ─────────────────────   │
│                         │
│ [⏸️ 투어 일시정지]      │
│ [✅ 투어 종료]          │
└─────────────────────────┘
↓ [📊 통계] 탭 클릭
┌─────────────────────────┐
│ ← 경복궁 투어 (#A1234)  │
│         🔴 LIVE  ⚙️ 🆘  │
├─────────────────────────┤
│ [💬 메시지] [👥 참여자] [📊 통계]│
├─────────────────────────┤
│                         │
│ 참여자 현황             │
│                         │
│  총 30명                │
│                         │
│  언어별 분포:           │
│  🇻🇳 베트남어: 10명(33%)│
│  🇺🇸 English: 8명 (27%) │
│  🇰🇷 한국어: 5명 (17%)  │
│  🇨🇳 简体中文: 4명(13%) │
│  🇹🇼 繁體中文: 2명 (7%) │
│  🇯🇵 日本語: 1명 (3%)   │
│                         │
│  💡 실시간 자동 번역    │
│                         │
│ ─────────────────────   │
│                         │
│  접속 상태              │
│  🟢 온라인: 27명 (90%) │
│  🔴 오프라인: 3명 (10%)│
│                         │
│ ─────────────────────   │
│                         │
│  활동 통계              │
│  총 메시지: 45건        │
│  질문 접수: 12건        │
│  긴급 알림: 0건         │
│                         │
└─────────────────────────┘

6️⃣ 관광객 투어 참여 화면
┌─────────────────────────┐
│ ☰ TourTalk         ⚙️ 🆘│
├─────────────────────────┤
│                         │
│  안녕하세요, Nguyen님!  │
│                         │
│  투어에 참여하세요      │
│                         │
│ ─────────────────────   │
│                         │
│  투어 코드 입력         │
│  ┌─────────────────┐   │
│  │ A 1 2 3 4       │   │
│  └─────────────────┘   │
│                         │
│  [참여하기]             │
│                         │
│ ─────────────────────   │
│                         │
│  또는                   │
│                         │
│  [📷 QR 코드 스캔]      │
│                         │
│                         │
│ ─────────────────────   │
│                         │
│  내 투어 (1)            │
│ ┌─────────────────────┐ │
│ │ 경복궁 오전 투어    │ │
│ │ 가이드: Kim MinSoo  │ │
│ │ [입장하기]          │ │
│ └─────────────────────┘ │
│                         │
└─────────────────────────┘
↓ 코드 입력/QR 스캔 후
┌─────────────────────────┐
│ 투어 정보 확인          │
├─────────────────────────┤
│                         │
│  경복궁 오전 투어       │
│  Guide: Kim MinSoo      │
│                         │
│  📅 2025-02-10          │
│  🕐 09:00 시작          │
│  📍 경복궁 광화문       │
│                         │
│  👥 30명 참여중         │
│                         │
│ ─────────────────────   │
│                         │
│  참여하시겠습니까?      │
│                         │
│ [취소]        [참여]    │
└─────────────────────────┘

7️⃣ 관광객 메인 화면
┌─────────────────────────┐
│ ← Gyeongbokgung Tour    │
│    (#A1234)   ⚙️ 🆘     │
├─────────────────────────┤
│ 🎤 Kim MinSoo 🟢        │
│ 👥 30명                 │
├─────────────────────────┤
│                         │
│ 🔊 Chúng ta sẽ tập trung│
│    tại cổng chính sau   │
│    10 phút              │
│    (10분 후 정문에서 만나요)│
│    📢 5분 전  [🔊 듣기]  │
│                         │
│ 🔊 Đây là Điện Geunjeon,│
│    cung điện chính nơi  │
│    vua làm việc...      │
│    (이곳은 근정전입니다...)│
│    📢 12분 전 [🔊 듣기]  │
│                         │
│ 🔊 Bây giờ là thời gian │
│    chụp ảnh tự do       │
│    (자유 시간입니다)     │
│    📢 25분 전 [🔊 듣기]  │
│                         │
│                         │
│                         │
├─────────────────────────┤
│ [🎤 질문] [📷 사진] [💬 더보기]│
│                         │
│      [🆘 긴급 상황]     │
└─────────────────────────┘

8️⃣ 빠른 요청 화면 (관광객용)
┌─────────────────────────┐
│ ← Gửi yêu cầu      🌐 🆘│
├─────────────────────────┤
│                         │
│  자주 쓰는 요청          │
│                         │
│  [🚻 Nhà vệ sinh ở đâu?]│
│     화장실 어디 있나요?  │
│                         │
│  [📸 Chụp ảnh giúp tôi] │
│     사진 찍어주세요      │
│                         │
│  [🤚 Chờ một chút]      │
│     잠깐만요            │
│                         │
│  [❓ Tôi có câu hỏi]    │
│     질문이 있어요        │
│                         │
│  [🤒 Tôi không khỏe]    │
│     몸이 안 좋아요       │
│                         │
│  [🙋 Giúp tôi]          │
│     도와주세요           │
│                         │
│ ─────────────────────   │
│                         │
│  직접 입력하기           │
│  ┌─────────────────┐   │
│  │                 │   │
│  └─────────────────┘   │
│  [🎤]         [전송]    │
│                         │
│ ─────────────────────   │
│                         │
│  [🆘 긴급 상황 알리기]  │
└─────────────────────────┘
↓ [🆘] 버튼 클릭
┌─────────────────────────┐
│ ⚠️ 긴급 알림            │
├─────────────────────────┤
│                         │
│  긴급 알림을 보내시겠습니까?│
│                         │
│  📱 알림 대상:          │
│  • 엄마 (✅ 앱 푸시)    │
│  • 아빠 (✅ 앱 푸시)    │
│  • 친구 (📧 이메일)     │
│  • 가이드 (Kim MinSoo)  │
│                         │
│  📍 현재 위치 정보와    │
│     투어 정보가         │
│     함께 전송됩니다     │
│                         │
│ ─────────────────────   │
│                         │
│  상황 선택 (선택사항)   │
│  [🤒 아파요]            │
│  [😰 길을 잃었어요]     │
│  [🆘 도와주세요]        │
│  [기타]                 │
│                         │
│  추가 메시지:           │
│  ┌─────────────────┐   │
│  │                 │   │
│  └─────────────────┘   │
│                         │
│ [취소]      [🚨 전송]   │
└─────────────────────────┘


---

## 🔄 사용자 플로우

### 가이드 여정
```
로그인 
  → 프로필 입력 
  → 역할 선택 (가이드) 
  → 긴급 연락망 설정 
  → 가이드 홈
  → 새 투어 만들기 
  → 투어 코드/QR 생성 
  → 투어 관리 (메시지/참여자/통계 탭)
```

### 관광객 여정
```
로그인 
  → 프로필 입력 
  → 역할 선택 (관광객) 
  → 긴급 연락망 설정 
  → 투어 참여 (코드/QR 입력)
  → 관광객 메인 (메시지 수신)
  → 빠른 요청 / 긴급 알림
```

---

## 💻 기술 스택

### Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| **Next.js** | 16.1.6 | React 프레임워크 |
| **React** | 19.2.4 | UI 라이브러리 |
| **TypeScript** | 5.9.3 | 타입 안정성 |
| **Tailwind CSS** | 4.1.18 | 스타일링 |

### UI 라이브러리
| 기술 | 버전 | 용도 |
|------|------|------|
| **lucide-react** | latest | 아이콘 |
| **react-qr-code** | latest | QR 코드 생성 |
| **react-hot-toast** | latest | 알림/토스트 |

### 개발 도구
| 기술 | 버전 | 용도 |
|------|------|------|
| **ESLint** | latest | 코드 린팅 |
| **PostCSS** | latest | CSS 처리 |

### 배포
| 플랫폼 | 용도 |
|--------|------|
| **Vercel** | 호스팅 및 자동 배포 |
| **GitHub** | 버전 관리 |

### 버전 정책
- **Next.js 16.1.6**: 2025년 2월 최신 안정화 버전
- **React 19.2.4**: Next.js 16 호환 최신 버전
- **TypeScript 5.9.3**: 최신 안정화 버전  
- **Tailwind CSS 4.1.18**: 최신 메이저 버전 (v4)
- 기타 라이브러리: npm 최신 안정화 버전 사용

### 📚 참고 문서
- Next.js: https://nextjs.org/docs
- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Tailwind CSS v4: https://tailwindcss.com/docs
- Tailwind v4 마이그레이션: https://tailwindcss.com/docs/upgrade-guide

---

## 📁 프로젝트 구조

```
tourtalk-mvp/
├── app/
│   ├── page.tsx                      # 0️⃣ 로그인 화면
│   ├── layout.tsx                    # 루트 레이아웃
│   ├── globals.css                   # 글로벌 스타일
│   │
│   ├── onboarding/
│   │   ├── profile/page.tsx          # 프로필 입력
│   │   ├── role/page.tsx             # 1️⃣ 역할 선택
│   │   └── emergency/page.tsx        # 2️⃣ 긴급 연락망
│   │
│   ├── guide/
│   │   ├── page.tsx                  # 3️⃣ 가이드 홈
│   │   ├── create/page.tsx           # 4️⃣ 투어 생성
│   │   └── tour/
│   │       └── [id]/page.tsx         # 5️⃣ 투어 관리
│   │
│   └── tourist/
│       ├── page.tsx                  # 6️⃣ 투어 참여
│       ├── tour/
│       │   └── [id]/page.tsx         # 7️⃣ 관광객 메인
│       └── request/page.tsx          # 8️⃣ 빠른 요청
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # 헤더 (햄버거, 언어선택)
│   │   ├── Hamburger.tsx             # 햄버거 메뉴
│   │   └── LanguageSelector.tsx      # 언어 선택 모달
│   │
│   ├── ui/
│   │   ├── Button.tsx                # 버튼 컴포넌트
│   │   ├── Card.tsx                  # 카드 컴포넌트
│   │   ├── Input.tsx                 # 입력 필드
│   │   └── Badge.tsx                 # 뱃지 (상태 표시)
│   │
│   └── modals/
│       ├── EmergencyModal.tsx        # 긴급 알림 모달
│       ├── LanguageModal.tsx         # 언어 선택 모달
│       └── ConfirmModal.tsx          # 확인 모달
│
├── lib/
│   ├── mockData.ts                   # Mock 데이터
│   ├── i18n.ts                       # 다국어 텍스트
│   └── utils.ts                      # 유틸리티 함수
│
├── types/
│   └── index.ts                      # TypeScript 타입 정의
│
├── public/
│   ├── images/                       # 이미지 파일
│   └── favicon.ico                   # 파비콘
│
├── .env.local                        # 환경 변수 (로컬)
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
└── README.md
```

---

## 🎨 디자인 가이드

### 컬러 팔레트
```typescript
// Tailwind CSS 기본 색상 사용
Primary: blue-500 (#3B82F6), blue-600 (#2563EB)
Success: green-500 (#22C55E)
Warning: yellow-400 (#FACC15)
Danger: red-500 (#EF4444)
Emergency: red-600 (#DC2626)
Gray Scale: gray-50 ~ gray-900
Background: white, gray-50
```

### 타이포그래피
```css
폰트: 시스템 기본 폰트
  -apple-system, BlinkMacSystemFont, "Segoe UI", 
  "Noto Sans KR", sans-serif

제목 (h1): text-4xl (36px), font-bold
부제목 (h2): text-2xl (24px), font-bold
본문: text-base (16px), font-normal
작은 텍스트: text-sm (14px)
```

### 아이콘
- **Lucide Icons** 사용: https://lucide.dev
- **Emoji** 보조 사용: 🎤 👥 🆘 📍 🔊 등

### 반응형 브레이크포인트
```typescript
sm: 640px   // 모바일
md: 768px   // 태블릿
lg: 1024px  // 데스크톱
xl: 1280px  // 대형 데스크톱
```

---

## 🔑 핵심 기능 명세

### 1. 다국어 UI (시각적 표시만)
- 언어 선택 시 화면의 텍스트 변경 (하드코딩)
- 지원 언어: 한국어, 영어, 중국어, 일본어, 베트남어, 태국어, 인도네시아어
- localStorage에 선택 언어 저장

### 2. 역할 기반 네비게이션
- 가이드 선택 → 가이드 전용 화면들
- 관광객 선택 → 관광객 전용 화면들
- localStorage에 역할 저장

### 3. 투어 코드/QR
- 6자리 랜덤 코드 생성 (Mock)
- react-qr-code로 QR 이미지 생성
- 클립보드 복사 기능 (react-hot-toast)

### 4. 긴급 연락망
- 이메일 입력/검색 UI
- localStorage에 연락처 저장 (최대 5개)
- 회원/비회원 구분 표시

### 5. 메시지 시뮬레이션
- 가이드가 메시지 입력 → Mock 번역 텍스트 표시
- 관광객 화면에 수신 메시지 표시
- 시간 표시 (상대 시간)

### 6. 참여자 관리 UI
- 언어별 그룹 표시
- 접속 상태 (🟢 온라인 / 🔴 오프라인)
- Mock 데이터로 참여자 목록 표시

### 7. 통계 대시보드
- 언어별 분포 차트 (간단한 bar)
- 참여자 수, 메시지 수 등 통계
- Mock 데이터 사용

---

## 📊 Mock 데이터 구조

### 투어 데이터
```typescript
interface Tour {
  id: string;              // "A1234"
  name: string;            // "경복궁 오전 투어"
  date: string;            // "2025-02-10"
  startTime: string;       // "09:00"
  maxParticipants: number; // 30
  participants: number;    // 15
  status: 'active' | 'waiting' | 'completed';
  guideId: string;
  guideName: string;       // "Kim MinSoo"
}
```

### 참여자 데이터
```typescript
interface Participant {
  id: string;
  name: string;            // "Nguyen Van A"
  email: string;
  language: string;        // "vi"
  languageName: string;    // "베트남어"
  flag: string;            // "🇻🇳"
  isOnline: boolean;
  joinedAt: string;
}
```

### 메시지 데이터
```typescript
interface Message {
  id: string;
  tourId: string;
  senderId: string;
  senderName: string;
  senderRole: 'guide' | 'tourist';
  originalText: string;    // 원문
  translatedTexts: {       // 각 언어별 번역
    [languageCode: string]: string;
  };
  timestamp: string;
  isEmergency: boolean;
}
```

### 긴급 연락처 데이터
```typescript
interface EmergencyContact {
  id: string;
  name: string;
  email: string;
  relation: string;        // "엄마", "친구" 등
  isMember: boolean;       // TourTalk 회원 여부
}
```

---

## 🚀 개발 단계

### Phase 1: 프로젝트 셋업 (1일차, 4시간)
- [ ] Next.js 16 프로젝트 생성
- [ ] Tailwind CSS 4 설정
- [ ] 필요한 패키지 설치
- [ ] 기본 컴포넌트 구조 생성
- [ ] 0️⃣ 로그인 화면 구현
- [ ] 1️⃣ 역할 선택 화면 구현
- [ ] Header 컴포넌트 (햄버거, 언어 선택)

### Phase 2: 가이드 플로우 (2일차, 4시간)
- [ ] 2️⃣ 긴급 연락망 설정 화면
- [ ] 3️⃣ 가이드 홈 화면
- [ ] 4️⃣ 투어 생성 화면
- [ ] QR 코드 생성 기능
- [ ] Mock 데이터 생성

### Phase 3: 투어 관리 & 관광객 플로우 (3일차, 4시간)
- [ ] 5️⃣ 가이드 투어 관리 화면 (3개 탭)
- [ ] 6️⃣ 관광객 투어 참여 화면
- [ ] 7️⃣ 관광객 메인 화면
- [ ] 8️⃣ 빠른 요청 화면

### Phase 4: 모달 & 완성도 (4일차, 2시간)
- [ ] 긴급 알림 모달
- [ ] 언어 선택 모달
- [ ] 확인 모달
- [ ] 모바일 반응형 최적화
- [ ] 전체 플로우 테스트

### Phase 5: 배포 (4일차, 1시간)
- [ ] GitHub 저장소 생성
- [ ] Vercel 연동
- [ ] 배포 테스트
- [ ] URL 공유 준비

**예상 총 소요 시간: 약 15시간 (3-4일)**

---

## 🌐 다국어 지원

### 지원 언어 (8개)
- 🇰🇷 한국어 (ko)
- 🇺🇸 English (en)
- 🇻🇳 Tiếng Việt (vi)
- 🇨🇳 简体中文 (zh-CN) - 중국어 간체
- 🇹🇼 繁體中文 (zh-TW) - 중국어 번체
- 🇯🇵 日本語 (ja)
- 🇹🇭 ภาษาไทย (th)
- 🇮🇩 Bahasa Indonesia (id)

### 다국어 텍스트 관리
```typescript
// lib/i18n.ts
export const translations = {
  ko: {
    login: {
      title: 'TourTalk',
      subtitle: '다국어 실시간 통역',
      googleLogin: 'Google로 시작하기',
      kakaoLogin: '카카오로 시작하기',
    },
    // ...
  },
  en: {
    login: {
      title: 'TourTalk',
      subtitle: 'Real-time Multilingual Interpretation',
      googleLogin: 'Start with Google',
      kakaoLogin: 'Start with Kakao',
    },
    // ...
  },
  // ... 다른 언어들
};
```

### 언어 전환 로직
```typescript
// localStorage에서 언어 가져오기
const currentLanguage = localStorage.getItem('language') || 'ko';

// 텍스트 렌더링
<p>{translations[currentLanguage].login.title}</p>
```

---

## 📱 반응형 디자인

### 모바일 우선 (Mobile First)
- 기본: 320px ~ 640px
- 모든 화면 모바일 최적화 필수

### 태블릿
- 768px ~ 1024px
- 2단 레이아웃 가능

### 데스크톱
- 1024px ~
- 최대 너비 제한 (max-w-7xl)
- 중앙 정렬

---

## 🧪 테스트 시나리오

### 가이드 플로우 테스트
1. 로그인 → 프로필 입력 → 가이드 선택
2. 긴급 연락망 추가 (최소 1명)
3. 가이드 홈에서 [새 투어 만들기]
4. 투어 정보 입력 → 생성
5. 투어 코드 복사
6. QR 이미지 저장
7. 투어 관리 화면 진입
8. 메시지 탭: 텍스트 전송, 빠른 메시지
9. 참여자 탭: 언어별 그룹 확인
10. 통계 탭: 데이터 확인

### 관광객 플로우 테스트
1. 로그인 → 프로필 입력 → 관광객 선택
2. 긴급 연락망 추가
3. 투어 코드 입력 → 참여
4. 메시지 수신 확인
5. [🔊 듣기] 버튼 클릭
6. [질문] 버튼 → 빠른 요청
7. 프리셋 버튼 클릭
8. 자유 입력 → 전송
9. [🆘 긴급] → 모달 → 전송

### 언어 전환 테스트
1. 우상단 🌐 버튼 클릭
2. 영어 선택
3. 화면 텍스트 변경 확인
4. 다른 화면 이동 → 언어 유지 확인
5. 새로고침 → 언어 유지 확인

### 반응형 테스트
1. Chrome DevTools 모바일 모드
2. 각 화면 확인 (iPhone SE, iPhone 12 Pro, iPad)
3. 가로/세로 모드
4. 버튼 터치 영역 확인

---

## 🚨 주의사항

### localStorage 사용
- 브라우저별 용량 제한 (5-10MB)
- 민감 정보 저장 금지
- JSON.stringify/parse 사용

### Mock 데이터
- 실제 API 연동 X
- 하드코딩된 데이터 사용
- 새로고침 시 초기화 가능

### 긴급 기능
- 실제 알림 전송 X
- toast로 "전송됨" 표시만
- 연락처는 localStorage만

### QR 코드
- 실제 스캔 기능 X
- 이미지 표시만
- 다운로드는 브라우저 기본 기능

### Tailwind CSS v4 주의사항
- v3와 설정 파일 구조가 다름
- CSS 파일에서 직접 테마 설정
- PostCSS 플러그인 설정 필요
- 공식 문서 참고 필수

---

## 📊 성공 지표

### 정량적 지표
- [ ] 8개 화면 모두 구현 완료
- [ ] 모바일/태블릿/데스크톱 반응형
- [ ] 7개 언어 UI 지원
- [ ] 페이지 로딩 속도 < 2초
- [ ] Lighthouse 점수 > 90점

### 정성적 지표
- [ ] 테스터 10명 이상 피드백 수집
- [ ] 화면 전환 플로우 이해도 > 80%
- [ ] UI/UX 만족도 > 70%
- [ ] 서비스 사용 의향 > 60%

---

## 📅 일정

### Week 1
- **Day 1-2**: 프로젝트 셋업 + 로그인/역할 선택
- **Day 3-4**: 가이드 플로우
- **Day 5**: 관광객 플로우
- **Day 6**: 모달 + 반응형
- **Day 7**: 배포 + 테스트

### Week 2
- 피드백 수집
- 개선 사항 반영
- MVP 1 기획 시작

---

## 🔗 참고 링크

### 공식 문서
- Next.js 16: https://nextjs.org/docs
- React 19: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Tailwind CSS v4: https://tailwindcss.com/docs
- Lucide Icons: https://lucide.dev/
- Vercel 배포: https://vercel.com/docs

### 디자인 참고
- 투어 가이드 앱: Viator, GetYourGuide
- 번역 앱: Google Translate, Papago
- 메신저 앱: Telegram, WhatsApp

---

## 📮 연락처

### 프로젝트 관리자
- **이름**: Jun
- **역할**: Product Owner, Full-stack Developer

### 피드백
- GitHub Issues
- 이메일: (추후 추가)

---

## 🛠️ 기술 스택

### 프론트엔드

#### 필수 기술
```javascript
{
  "빌드 도구": "Vite",
  "프레임워크": "React 18+",
  "언어": "JavaScript (TypeScript 선택)",
  "스타일링": "TailwindCSS",
  "라우팅": "React Router v6",
  "상태 관리": "React Context API + useState"
}
```

#### UI 라이브러리
```javascript
{
  "토스트": "react-hot-toast",
  "아이콘": "Lucide React",
  "애니메이션": "Framer Motion (선택)"
}
```

### 배포
```javascript
{
  "호스팅": "Vercel",
  "도메인": "tourtalk-mvp0.vercel.app (예시)",
  "데이터베이스": "Supabase (MVP 1부터 사용)"
}
```

**MVP 0:** 데이터베이스 없음 (가짜 데이터만)  
**MVP 1:** Supabase 연동 (실제 데이터 저장)

### 개발 도구
```javascript
{
  "패키지 매니저": "npm 또는 pnpm",
  "코드 포매터": "Prettier",
  "린터": "ESLint"
}
```

---

### 프로젝트 구조 (예상)

```
tourtalk-mvp0/
├── public/
│   └── qr-sample.png          # QR 코드 샘플 이미지
│
├── src/
│   ├── components/            # 재사용 컴포넌트
│   │   ├── Header.jsx
│   │   ├── Button.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── Toast.jsx
│   │
│   ├── pages/                 # 8개 화면
│   │   ├── LoginPage.jsx      # 0️⃣ 로그인
│   │   ├── RoleSelectPage.jsx # 1️⃣ 역할 선택
│   │   ├── EmergencyPage.jsx  # 2️⃣ 긴급 연락망
│   │   ├── GuideHomePage.jsx  # 3️⃣ 가이드 홈
│   │   ├── TourCreatePage.jsx # 4️⃣ 투어 생성
│   │   ├── TourManagePage.jsx # 5️⃣ 투어 관리
│   │   ├── TouristJoinPage.jsx# 6️⃣ 투어 참여
│   │   ├── TouristMainPage.jsx# 7️⃣ 관광객 메인
│   │   └── QuickRequestPage.jsx# 8️⃣ 빠른 요청
│   │
│   ├── data/                  # 가짜 데이터
│   │   ├── translations.js    # 번역 문구 세트
│   │   ├── tours.js          # 투어 목록
│   │   ├── participants.js   # 참여자 목록
│   │   └── messages.js       # 메시지 목록
│   │
│   ├── context/              # 전역 상태
│   │   ├── UserContext.jsx   # 사용자 정보
│   │   └── TourContext.jsx   # 투어 정보
│   │
│   ├── utils/                # 유틸 함수
│   │   ├── fakeTranslate.js  # 가짜 번역 함수
│   │   └── delay.js          # 딜레이 함수
│   │
│   ├── App.jsx               # 메인 앱
│   ├── main.jsx              # 엔트리 포인트
│   └── index.css             # 글로벌 스타일
│
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

### 핵심 구현 로직

#### 1. 가짜 번역 함수
```javascript
// src/utils/fakeTranslate.js

import { translations } from '../data/translations';

export const fakeTranslate = async (koreanText, targetLanguage) => {
  // 0.5초 딜레이 (번역 중 효과)
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 미리 준비된 번역 찾기
  const translation = translations.find(t => t.ko === koreanText);
  
  if (translation) {
    return translation[targetLanguage] || translation.en;
  }
  
  // 없으면 원문 반환
  return koreanText;
};
```

#### 2. 회원 검색 함수 (개인정보 보호) 🔒
```javascript
// src/utils/searchUser.js

export const searchUserByEmail = (email, userDatabase) => {
  // 입력값 정규화 (소문자, 공백 제거)
  const normalizedEmail = email.trim().toLowerCase();
  
  // 정확히 일치하는 이메일만 검색
  const exactMatch = userDatabase.filter(
    user => user.email.toLowerCase() === normalizedEmail
  );
  
  // 부분 일치는 절대 반환 안함 (개인정보 보호)
  return exactMatch;
};

// ❌ 잘못된 예시 (개인정보 유출)
export const searchUserByEmailWRONG = (email, userDatabase) => {
  return userDatabase.filter(
    user => user.email.includes(email) // 부분 일치 - 위험!
  );
};

// 사용 예시
const result = searchUserByEmail('kim@email.com', users);
// kim@email.com → ✅ 검색됨
// minkim@email.com → ❌ 검색 안됨
// kimchi@email.com → ❌ 검색 안됨
```

#### 3. 메시지 전송 시뮬레이션
```javascript
// src/pages/TourManagePage.jsx

const handleSendMessage = async (messageText) => {
  // 1. 전송 중 상태
  setLoading(true);
  toast.loading('전송 중...', { id: 'sending' });
  
  // 2. 0.5초 딜레이
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 3. 메시지 추가 (가짜)
  const newMessage = {
    id: Date.now(),
    text: messageText,
    timestamp: new Date(),
    sender: 'guide'
  };
  
  setMessages([...messages, newMessage]);
  
  // 4. 완료 상태
  setLoading(false);
  toast.success('메시지 전송 완료!', { id: 'sending' });
};
```

#### 4. 언어 변경
```javascript
// src/context/UserContext.jsx

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [language, setLanguage] = useState('ko');
  const [role, setRole] = useState(null); // 'guide' | 'tourist'
  
  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    // 화면 전체가 새 언어로 변경됨
  };
  
  return (
    <UserContext.Provider value={{ 
      language, 
      changeLanguage, 
      role, 
      setRole 
    }}>
      {children}
    </UserContext.Provider>
  );
};
```

---

### 개발 단계

#### Phase 1: 환경 설정 (30분)
```bash
# 1. Vite 프로젝트 생성
npm create vite@latest tourtalk-mvp0 -- --template react

# 2. 의존성 설치
cd tourtalk-mvp0
npm install react-router-dom react-hot-toast lucide-react

# 3. TailwindCSS 설정
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. 개발 서버 시작
npm run dev
```

#### Phase 2: 기본 구조 (1시간)
- [ ] React Router 설정
- [ ] 8개 페이지 생성 (빈 껍데기)
- [ ] Context API 설정
- [ ] 기본 레이아웃 컴포넌트

#### Phase 3: 화면 구현 (3-4시간)
- [ ] 0️⃣ 로그인 화면
- [ ] 1️⃣ 역할 선택
- [ ] 2️⃣ 긴급 연락망
- [ ] 3️⃣ 가이드 홈
- [ ] 4️⃣ 투어 생성
- [ ] 5️⃣ 투어 관리
- [ ] 6️⃣ 투어 참여
- [ ] 7️⃣ 관광객 메인
- [ ] 8️⃣ 빠른 요청

#### Phase 4: 인터랙션 구현 (2-3시간)
- [ ] 가짜 번역 기능
- [ ] 로딩 애니메이션
- [ ] 토스트 알림
- [ ] 화면 전환
- [ ] 언어 변경

#### Phase 5: 배포 (30분)
```bash
# Vercel 배포
npm install -g vercel
vercel
```

**총 예상 시간: 7-9시간**

---

## 📄 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 2025-02-06 | 1.0.0 | 초안 작성 (최신 버전 반영) | Jun |

---

## ✅ 다음 단계 (MVP 1)

MVP 0 검증 후 다음 기능 개발 예정:
- [ ] 실제 소셜 로그인 연동
- [ ] Firebase 실시간 데이터베이스
- [ ] Google Translate API 또는 DeepL API 연동
- [ ] 실시간 메시징 (WebSocket)
- [ ] 푸시 알림
- [ ] STT/TTS 기능
- [ ] 사용자 인증 시스템

---

**문서 종료**
