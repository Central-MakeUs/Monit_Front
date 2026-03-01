import { style } from '@vanilla-extract/css';
import { vars } from '../theme.css';

export const container = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${vars.spacing.md} ${vars.spacing.xl}`,
  backgroundColor: 'transparent',
  zIndex: 100,

  // 네비게이션 토글은 2차 배포에서 숨김 처리되어 있기 때문에 터치를 받지 않도록 한다.
  // TODO: 2차 배포 완료 후 숨김 처리 해제
  pointerEvents: 'none',
});

export const plusButtonWrapper = style({
  position: 'absolute',
  right: vars.spacing.xl,

  // 컨테이너에 pointer-events: 'none'을 주었기 때문에
  // 실제로 클릭 가능한 플러스 버튼 영역만 터치를 받도록 수정
  pointerEvents: 'auto',
});
