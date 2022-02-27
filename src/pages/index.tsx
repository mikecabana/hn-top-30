import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { HNItem } from '../lib/models/hacker-news/hn-item.interface';
import { getTopNHNStories } from '../lib/services/hn-stories';
import { ExternalLinkIcon, RefreshIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';
import { NextPage } from 'next';

// import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
    const [stories, setStories] = useState<HNItem[]>([]);
    const [timestamp, setTimestamp] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const getStories = async () => {
        try {
            const data = await getTopNHNStories(30);

            setStories(data);
            setTimestamp(new Date().toLocaleString());

            ReactTooltip.rebuild();
        } catch (error: any) {
            alert(error.message);
        }
    };

    const loadStories = async () => {
        setLoading(true);
        await getStories();
        setLoading(false);
    };

    const refreshStories = async () => {
        setRefreshing(true);
        await getStories();
        setRefreshing(false);
    };

    useEffect(() => {
        loadStories();
    }, []);

    return (
        <Layout>
            <Head>
                <title>Hacker News Top 30</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex justify-between my-2">
                <span className='text-sm animate-pulse'>{loading && 'Loading...'}</span>
                <button
                    className={`flex items-center justify-center py-1 px-2 text-sm ${
                        loading || refreshing ? 'text-gray-300' : 'hover:underline hover:text-orange-600'
                    }`}
                    onClick={() => refreshStories()}
                    disabled={loading || refreshing}
                    data-tip={`Last refresh ${timestamp ? timestamp : 'never'}`}
                >
                    <span className="mr-2">Refresh</span>{' '}
                    <RefreshIcon className={`w-4 h-4 ${refreshing && 'animate-spin'}`} />
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
                    {stories.map((story, i) => (
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
            {/* <ReactTooltip /> */}
        </Layout>
    );
};

export default Home;
