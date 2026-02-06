# TourTalk MVP 0

AI 기반 다국어 실시간 통역 투어 가이드 플랫폼 **프로토타입**입니다.  
실제 API 연동 없이 화면 구성과 사용자 플로우만 시각화합니다.

## 목표

- 화면 구성 및 UI/UX 검증
- 사용자 여정(User Flow) 시각화
- 화면 간 전환 및 네비게이션 확인
- 초기 사용자 피드백 수집
- URL 공유를 통한 원격 테스트

## 기술 스택

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **lucide-react**, **react-qr-code**, **react-hot-toast**

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버
npm start
```

개발 서버는 기본적으로 http://localhost:3000 에서 실행됩니다.

## 화면 구성 (8개)

| 번호 | 화면 | 경로 |
|------|------|------|
| 0 | 로그인/회원가입 | `/` |
| 1 | 역할 선택 | `/onboarding/role` |
| 2 | 긴급 연락망 설정 | `/onboarding/emergency` |
| 3 | 가이드 홈 | `/guide` |
| 4 | 투어 생성 | `/guide/create` |
| 5 | 가이드 투어 관리 | `/guide/tour/[id]` |
| 6 | 관광객 투어 참여 | `/tourist` |
| 7 | 관광객 메인 | `/tourist/tour/[id]` |
| 8 | 빠른 요청 | `/tourist/request` |

## 사용자 플로우

1. **로그인** → Google/카카오 UI 클릭 → **프로필 입력** → **역할 선택**(가이드/관광객) → **긴급 연락망** 설정
2. **가이드**: 가이드 홈 → 새 투어 만들기 → 투어 생성 → 코드/QR 공유 → 투어 관리(메시지/참여자/통계)
3. **관광객**: 투어 참여(코드 또는 QR) → 관광객 메인(번역 메시지 수신) → 빠른 요청 / 긴급 알림

## 데모 시나리오

- **가이드 → 관광객 메시징**: 가이드가 "10분 후 정문에서 만나요" 전송 → 0.5초 후 관광객 화면에 선택 언어로 번역 문구 표시 (미리 준비된 10개 문구 세트 사용)
- **긴급 알림**: 관광객이 긴급 버튼 → 확인 모달 → 전송 시뮬레이션 → 토스트
- **투어 참여**: 6자리 코드 입력(예: A1234) → 참여 확인 → 참여 완료 후 관광객 메인으로 이동

## 지원 언어 (UI)

한국어, English, Tiếng Việt, 简体中文, 繁體中文, 日本語, ภาษาไทย, Bahasa Indonesia (8개).  
우상단 🌐 버튼으로 전환 가능하며, 선택 값은 localStorage에 저장됩니다.

## 제외 사항 (MVP 1 이후)

- 실제 소셜 로그인
- 실제 번역/통역 API
- 실시간 메시징(WebSocket)
- 데이터베이스 연동
- 실제 푸시 알림
- 결제 시스템

## 배포 (Vercel)

1. GitHub 저장소에 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 import
3. 빌드 설정: `npm run build`, 출력 디렉터리 `.next`
4. 배포 후 URL 공유하여 테스트

## 라이선스

Private.
