import { FunctionComponent, HTMLProps } from 'react';
import Link from 'next/link';

export interface NextLinkProps {
	href: string;
}

export const NextLink: FunctionComponent<NextLinkProps & HTMLProps<HTMLAnchorElement>> = ({
	href,
	children,
	...rest
}) => {
	return (
		<Link href={href}>
			<a {...rest}>{children}</a>
		</Link>
	);
};
