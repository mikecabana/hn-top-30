import { FunctionComponent, useRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { NextLink } from '../NextLink';

export interface MegaMenuProps {
	name: string;
	url?: string;
	useHover?: boolean;
}

export const MegaMenu: FunctionComponent<MegaMenuProps> = ({ name, url, useHover }) => {
	const buttonRef = useRef(null);
	const dropdownRef = useRef(null);
	const timeoutDuration = 200;
	let timeout;

	const openMenu = () => buttonRef?.current.click();

	const closeMenu = () =>
		dropdownRef?.current?.dispatchEvent(
			new KeyboardEvent('keydown', {
				key: 'Escape',
				bubbles: true,
				cancelable: true,
			})
		);

	const onMouseEnter = (closed?: boolean) => {
		clearTimeout(timeout);
		closed && openMenu();
	};

	const onMouseLeave = (open: boolean) => {
		open && (timeout = setTimeout(() => closeMenu(), timeoutDuration));
	};

	const linkProps = {
		href: useHover ? url : null,
	};

	return (
		<Menu as="div" className="relative">
			{({ open }) => (
				<>
					<div
						className={`mr-4 hover:underline cursor-pointer font-semibold`}
						onClick={openMenu}
						onMouseEnter={() => useHover && onMouseEnter(!open)}
						onMouseLeave={() => useHover && onMouseLeave(open)}>
						<Menu.Button ref={buttonRef} as={useHover ? 'a' : 'button'} {...linkProps}>
							<span>{name}</span>
						</Menu.Button>
					</div>

					<Transition
						show={open}
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0">
						<Menu.Items
							ref={dropdownRef}
							onMouseEnter={() => useHover && onMouseEnter()}
							onMouseLeave={() => useHover && onMouseLeave(open)}
							static
							className={`absolute right-0 w-56 mt-8 origin-top-right bg-white rounded-lg shadow-sm border border-gray-200 outline-none p-4 grid grid-cols-1 gap-0 md:gap-4`}>
							{/* links */}

							<div className="">
								<Menu.Item>
									{({ active }) => (
										<NextLink
											href="/"
											className={`${
												active ? `bg-gray-50 text-indigo-600` : `text-gray-600`
											} transition duration-150 ease-in-out rounded-lg font-medium flex items-center p-2 my-2 focus:outline-none focus-visible:ring focus-visible:ring-indigo-600 focus-visible:ring-opacity-50`}>
											Home
										</NextLink>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<NextLink
											href="/about"
											className={`${
												active ? `bg-gray-50 text-indigo-600` : `text-gray-600`
											} transition duration-150 ease-in-out rounded-lg font-medium flex items-center p-2 my-2 focus:outline-none focus-visible:ring focus-visible:ring-indigo-600 focus-visible:ring-opacity-50`}>
											About
										</NextLink>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};
