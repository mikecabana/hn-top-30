import React from 'react';
import Link from 'next/link';
import { NewspaperIcon } from '@heroicons/react/outline';

import { MegaMenu } from '../MegaMenu';
import { MegaMenuMobile } from '../MegaMenuMobile';

// import styles from './Nav.module.scss';

export type NavProps = {};

export function Nav({}: NavProps) {
    return (
        <div className="flex justify-between items-center p-4 mb-8 bg-gray-100">
            <div className="flex items-center">
                <Link href="/">
                    <a className="mr-8 flex items-center">
                        <NewspaperIcon className="h-10 w-10 text-orange-600 mr-4" /> <span className='md:text-2xl text-md font-semibold'>HN Top 30</span>
                    </a>
                </Link>

                <div className="md:block hidden">
                    <Link href="/">
                        <a className="hover:underline hover:text-orange-600 font-semibold">Home</a>
                    </Link>

                    {/* other links here */}
                </div>
            </div>

            <div className="flex items-center">
                <div className="flex-grow flex items-center md:hidden">
                    {/* <MegaMenuMobile /> */}
                </div>
            </div>
        </div>
    );
}
