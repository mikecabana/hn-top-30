import { RefreshIcon } from '@heroicons/react/outline';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Layout } from '../components';
import { getHNItem } from '../lib/api/hacker-news';
import { HNItem } from '../lib/models/hacker-news/hn-item.interface';
import { getHNStoryComments, getHNUserSubmittedCount } from '../lib/services/hn-stories';
import ReactTooltip from 'react-tooltip';
import Head from 'next/head';

const Item: NextPage = () => {
    const [item, setItem] = useState<HNItem>();
    const [comments, setComments] = useState<HNItem[]>([]);
    const [commentCounts, setCommentCounts] = useState<number[]>([]);

    const [timestamp, setTimestamp] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const router = useRouter();

    const { id } = router.query;

    const getUserSubmittedCount = async (comments: HNItem[]) => {
        const counts = [];

        console.log(comments);

        for (const comment of comments) {
            const count = await getHNUserSubmittedCount(comment.by);
            counts.push(count);
        }

        setCommentCounts(counts);
    };

    const getComments = async (kids: number[]) => {
        try {
            const data = await getHNStoryComments(kids, 10);
            setComments(data);
            await getUserSubmittedCount(data);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const getItem = async () => {
        try {
            const data = await getHNItem(parseInt(id as string, 10));
            setItem(data);
            if (data?.kids) {
                await getComments(data.kids);
            }
            setTimestamp(new Date().toLocaleString());

            ReactTooltip.rebuild();
        } catch (error: any) {
            alert(error.message);
        }
    };

    const loadItem = async () => {
        setLoading(true);
        await getItem();
        setLoading(false);
    };

    const refreshItem = async () => {
        setRefreshing(true);
        await getItem();
        setRefreshing(false);
    };

    useEffect(() => {
        if (id) {
            loadItem();
        }
    }, [id]);

    return (
        <Layout>
            <Head>
                <title>{item?.title} | Hacker News Top 30</title>
            </Head>

            <div className="bg-gray-100 mb-2 p-2">
                <div>{item?.title && <h1 className="text-xl">{item?.title}</h1>}</div>
                <div>{item?.by && <span className="text-sm">by: {item?.by}</span>}</div>
            </div>
            <div className="flex justify-between my-2">
                <span className="text-sm">{loading && 'Loading...'}</span>
                <button
                    className={`flex items-center justify-center py-1 px-2 text-sm ${
                        loading || refreshing ? 'text-gray-300' : 'hover:underline hover:text-orange-600'
                    }`}
                    onClick={() => refreshItem()}
                    disabled={loading || refreshing}
                    data-tip={`Last refresh ${timestamp ? timestamp : 'never'}`}
                >
                    <span className="mr-2">Refresh</span>{' '}
                    <RefreshIcon className={`w-4 h-4 ${refreshing && 'animate-spin'}`} />
                </button>
            </div>
            <table className={`text-xs bg-gray-100 w-full ${(loading || refreshing) && 'text-gray-400'}`}>
                <thead>
                    <tr>
                        <th className="px-2 py-1 border-2 border-l-0 border-white">#</th>
                        <th className="px-2 py-1 border-2 border-white">Top 10 Comments</th>
                        <th className="px-2 py-1 border-2 border-r-0 border-white">User Submissions</th>
                    </tr>
                </thead>
                <tbody>
                    {comments?.map((comment, i) => (
                        <tr key={i}>
                            <td className="px-2 py-1 border-2 border-l-0 border-white text-center">{i + 1}</td>
                            <td className="px-2 py-1 border-2 border-white">
                                {comment.deleted ? (
                                    <div className="text-xs text-gray-400">[deleted]</div>
                                ) : (
                                    <>
                                        {comment.dead ? (
                                            <div className="text-xs text-gray-400">[flagged]</div>
                                        ) : (
                                            <>
                                                {' '}
                                                <div
                                                    className="mb-1 comment"
                                                    dangerouslySetInnerHTML={{ __html: comment.text || '' }}
                                                ></div>
                                                <div className="text-xs text-gray-400">commenter: {comment.by}</div>
                                            </>
                                        )}
                                    </>
                                )}
                            </td>
                            <td className="px-2 py-1 border-2 border-r-0 border-white text-center">
                                {commentCounts[i]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
};

export default Item;
