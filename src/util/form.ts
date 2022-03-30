import Link from '@/components/Link';

export const linkProps = (href: string) =>
  ({
    component: Link,
    href,
  } as any);
