/* ============================================================
   고반식당 MOT 점검 V2 — 설정
   ============================================================ */
window.MOT = window.MOT || {};

MOT.config = {
  /* Apps Script 웹앱 배포 URL (.../exec)
     결과 스프레드시트 "MOT_고반_점검결과_V2" 에 붙인 스크립트의 배포 주소.
     배포 후 아래 값을 채워 넣으세요. 앱 설정 화면에서도 변경할 수 있습니다. */
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbyjbfyjrsHayT6R3d-kR_VfyJxNUDvofcntCLgS5IxlOwNeCHwxe4x7NKE8O2gSFZ5Wvg/exec",

  /* 참고용 시트 주소 (앱 설정 화면 안내에 사용) */
  CHECKLIST_SHEET_URL: "https://docs.google.com/spreadsheets/d/15Cjsh5T-YvhjNsR8FH6BcPLNJSS_JEeFjeCm0pktGf0/edit",
  RESULT_SHEET_URL:    "https://docs.google.com/spreadsheets/d/1kWdTd58LV-bxzTo3vgHoVkMm1-0s7dMgWhumOlapk9w/edit",

  BRAND: "고반식당",
  APP_VERSION: "2.0.3",

  /* 등급 컷 (점수 이상이면 해당 등급) */
  GRADE_CUTS: [
    { grade: "S", min: 90 },
    { grade: "A", min: 80 },
    { grade: "B", min: 70 },
    { grade: "C", min: 60 },
    { grade: "D", min: 50 },
    { grade: "F", min: 0  }
  ],

  /* 점검율에 따른 등급 상한 — 점검율이 낮으면 등급을 제한 */
  RATE_CAPS: [
    { min: 80, cap: null },   // 제한 없음
    { min: 60, cap: "A"  },
    { min: 50, cap: "B"  },
    { min: 0,  cap: "C"  }    // 50% 미만 → C + 재점검 대상
  ],
  RECHECK_RATE: 50,           // 이 미만이면 재점검 계획 대상 경고

  NETWORK_TIMEOUT: 12000,     // 시트 통신 제한시간(ms)
  CHECKLIST_TTL: 6 * 60 * 60 * 1000  // 캐시를 '신선'으로 볼 시간(6시간)
};

/* localStorage 키 */
MOT.LS = {
  settings:  "motv2_settings",
  history:   "motv2_history",
  draft:     "motv2_draft",
  checklist: "motv2_checklist_cache",
  lastInput: "motv2_last_input",
  inspector: "motv2_inspector"
};

/* 변경 이력 (최신이 위) */
MOT.CHANGELOG = [
  { v: "2.0.3", date: "2026-08-06", items: [
    "점검 이력 카드를 한눈에 보이게 바꿨어요 — 점수를 등급 색 배지로 크게 표시하고, 브랜드·대상·홀 인원·제외 단계·미흡/불이행 개수를 함께 보여줍니다",
    "카드 아무 곳이나 누르면 결과가 열립니다",
    "이미 전송한 점검은 수정·삭제할 수 없습니다 — 삭제는 아직 전송하지 않은 기기 기록만 가능합니다 (기록 보존)",
    "온라인 점검이력(구글 시트)도 같은 형식으로 보기 좋게 정리했습니다 (열람 전용)"
  ]},
  { v: "2.0.2", date: "2026-08-06", items: [
    "앱을 새로 배포해도 휴대폰이 예전 화면을 계속 보여주던 문제를 고쳤습니다",
    "설정에 '앱 최신 버전 받기' 추가 — 화면이 예전 그대로일 때 누르면 앱을 새로 내려받습니다"
  ]},
  { v: "2.0.1", date: "2026-08-06", items: [
    "설정에 '스마트폰·PC에 설치' 추가 — 버튼 한 번으로 홈 화면에 아이콘을 만들 수 있어요 (V1에 있던 기능 복원)",
    "카카오톡 등 메신저 안에서 앱을 열면 안내 배너가 뜹니다 — '기본 브라우저로 열기' 버튼으로 Chrome·Safari에서 다시 열 수 있어요",
    "이미 설치해서 앱으로 실행 중이면 설치 버튼이 '이미 설치되어 있어요'로 바뀝니다"
  ]},
  { v: "2.0.0", date: "2026-08-06", items: [
    "V2 전면 개편 — 체크리스트를 구글 시트에서 직접 불러옵니다. 문항·배점·판정 기준을 시트에서 고치면 앱에 바로 반영됩니다",
    "채점 방식 변경: 감점제 → 획득점수제. '일반' 24문항의 이행 점수 합계가 100점이며, 미흡은 절반, 불이행은 0점입니다",
    "'상황발생시' 6문항 신설 — 상황이 실제 발생했을 때만 점검하며, 불이행일 때만 −2 또는 −4점이 차감됩니다",
    "'개인 / 매장공통' 구분 신설 — 결과 화면에서 개인 서비스와 매장 공통 항목의 점수를 나눠 봅니다",
    "문항별 이행·미흡·불이행 판정 기준을 앱에서 바로 확인할 수 있습니다",
    "직접주문 / 테이블오더 구분 폐지 — 하나의 체크리스트로 통합",
    "절대 금지 10계명은 시트에서 관리하며 위반 1건당 점수를 차감합니다"
  ]}
];
