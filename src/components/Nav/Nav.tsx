import React from 'react';
import Link from 'next/link';
import { GlobeIcon } from '@heroicons/react/outline';

import { MegaMenu } from '../MegaMenu';
import { MegaMenuMobile } from '../MegaMenuMobile';

// import styles from './Nav.module.scss';

export type NavProps = {};

export function Nav({}: NavProps) {
	return (
		<div className="bg-white sticky top-0">
			<div className="container mx-auto border-b border-gray-200 flex justify-between items-center p-4 mb-8">
				<div className="flex-grow flex items-center">
					<Link href="/">
						<a className="mr-4">
							<GlobeIcon className="h-10 w-10 text-indigo-700" />
						</a>
					</Link>

					<div className="md:flex items-center hidden">
						<Link href="/">
							<a className="mr-4 hover:underline  font-semibold">Home</a>
						</Link>

						<Link href="/about">
							<a className="mr-4 hover:underline  font-semibold">About</a>
						</Link>
					</div>
				</div>

				<div className="flex items-center">
					<div className="flex-grow flex items-center md:hidden">
						<MegaMenuMobile />
					</div>
					<div className="flex-grow md:flex items-center hidden">
						<MegaMenu name="Menu" useHover={true} />
					</div>
				</div>
			</div>
		</div>
	);
}
