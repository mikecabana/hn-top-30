import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { HNItem } from '../lib/models/hacker-news/hn-item.interface';
import { getTopHNNStories } from '../lib/services/hn-stories';
import { ExternalLinkIcon, RefreshIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';
import { NextPage } from 'next';

import { useQuery } from 'react-query';

const Home: NextPage = () => {
    const { data, refetch, isFetching, isLoading, dataUpdatedAt } = useQuery('get-stories-top-30', () => getTopHNNStories(30), {
        onSuccess: () => ReactTooltip.rebuild(),
    });

    return (
        <Layout>
            <Head>
                <title>Hacker News Top 30</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex justify-between my-2">
                <span className="text-sm animate-pulse">{isLoading && 'Loading...'}</span>
                <button
                    className={`flex items-center justify-center py-1 px-2 text-sm ${
                        isFetching ? 'text-gray-300' : 'hover:underline hover:text-orange-600'
                    }`}
                    onClick={() => refetch()}
                    disabled={isFetching}
                    data-tip={`Last refresh ${dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleString() : 'never'}`}
                >
                    <span className="mr-2">{isFetching ? 'Refreshing' : 'Refresh'}</span>{' '}
                    <RefreshIcon className={`w-4 h-4 ${isFetching && 'animate-spin'}`} />
                </button>
            </div>

            <table className="text-sm w-full bg-gray-100">
                <thead>
                    <tr>
                        <th className="px-2 py-1 border-2 border-l-0 border-white">#</th>
                        <th className="px-2 py-1 border-2 border-white text-left">Title</th>
                        <th className="px-2 py-1 border-2 border-white text-right">Comments</th>
                        <th className="px-2 py-1 border-2 border-r-0 border-white"></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((story, i) => (
                        <tr key={i}>
                            <td className="px-2 py-1 border-2 border-l-0 border-white text-center">{i + 1}</td>
                            <td className="px-2 py-1 border-2 border-white">
                                <div className="mb-1">
                                    <Link href={`/${story.id}`}>
                                        <a className="hover:underline hover:text-orange-600">{story.title}</a>
                                    </Link>
                                </div>
                                <div className="text-xs text-gray-400">by: {story.by}</div>
                            </td>
                            <td className="px-2 py-1 border-2 border-white text-right">{story.descendants}</td>
                            <td className="px-2 py-1 border-2 border-r-0 border-white text-center">
                                <a
                                    href={story.url}
                                    target="_blank"
                                    className="flex justify-center hover:text-orange-600"
                                    data-tip="Go to article"
                                >
                                    <ExternalLinkIcon className="w-4 h-4" />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
};

export default Home;
