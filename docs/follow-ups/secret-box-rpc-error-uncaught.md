# 비밀 우체통 열기에서 DB 오류가 화면 오류로 번짐

`components/screens/secret-box-screen.tsx`의 `openSecretBox` 호출에 catch가 없어, `open_secret_box` RPC가 실패하면(Supabase 일시 장애 등) 안내 문구 대신 오류 화면이 뜬다. 2026-11-19 `code-review low`에서 발견했고 재현하지는 않았다. 다음 단계: 실패 시 "잠시 뒤 다시 시도해 주세요" 안내를 보여 줄지 정한다.
