import { openWebview } from 'zmp-sdk';

export const handleClickAnchorToWebview = (
  event: MouseEvent,
  container: HTMLElement | null
) => {
  const target = event.target as HTMLElement;
  const link = target.closest('a');

  if (link && container?.contains(link)) {
    event.preventDefault();
    const href = link.getAttribute('href');
    if (href) {
      openWebview({ url: href });
    }
  }
};