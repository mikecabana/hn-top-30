import { Fragment, FunctionComponent, useRef } from 'react';
import { Menu, Transition, Popover } from '@headlessui/react';
import { NextLink } from '../NextLink';
import { MenuAlt4Icon, XIcon } from '@heroicons/react/outline';

export interface MegaMenuMobileProps {}

const StyledNextLink: FunctionComponent<{ href: string }> = ({ href, children, ...props }) => (
	<NextLink
		href={href}
		{...props}
		className="transition duration-150 ease-in-out rounded-lg font-medium text-gray-600 flex items-center p-2 my-2 hover:text-indigo-600 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-indigo-600 focus-visible:ring-opacity-50">
		{children}
	</NextLink>
);

export const MegaMenuMobile: FunctionComponent<MegaMenuMobileProps> = ({}) => {
	return (
		<Popover className="">
			{({ open }) => (
				<>
					<Popover.Button className="mr-4 cursor-pointer flex items-center">
						<MenuAlt4Icon className="h-8 w-8" />
					</Popover.Button>

					<Popover.Overlay className={`${open ? 'opacity-30 fixed inset-0' : 'opacity-0'} bg-black`} />

					<Transition
						as={Fragment}
						show={open}
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0">
						<Popover.Panel
							static
							className="absolute right-0 left-0 top-0 z-10 bg-white rounded shadow-lg outline-none p-4 m-2">
							{/* links */}
							<div className="flex justify-end items-center">
								<Popover.Button className="mr-4 cursor-pointer flex items-center">
									<XIcon className="h-5 w-5" />
								</Popover.Button>
							</div>

							<StyledNextLink href="/">Home</StyledNextLink>

							<StyledNextLink href="/about">About</StyledNextLink>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};
