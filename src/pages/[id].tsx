import { RefreshIcon } from '@heroicons/react/outline';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '../components';
import { getHNItem } from '../lib/api/hacker-news';
import { getHNStoryComments, getHNUserSubmittedCount } from '../lib/services/hn-stories';
import ReactTooltip from 'react-tooltip';
import Head from 'next/head';
import { useQuery } from 'react-query';

const Item: NextPage = () => {
    const router = useRouter();

    const id = typeof router.query?.id === 'string' ? router.query.id : '';

    const { data, refetch, isFetching, isLoading, dataUpdatedAt } = useQuery(
        `get-item-${id}`,
        () => getHNItem(parseInt(id as string, 10)),
        {
            onSuccess: (item) => {
                ReactTooltip.rebuild();

                // I suspect we need to wait for the next event loop to call `refetchComments`.
                // Needs investigating as to why `get-top-10-comments-${id}` query doesn't run.
                setTimeout(() => refetchComments(), 1);
            },
            enabled: !!id,
        }
    );

    const {
        data: comments,
        refetch: refetchComments,
        isFetching: isFetchingComments,
        isLoading: isLoadingComments,
    } = useQuery(`get-top-10-comments-${id}`, () => getHNStoryComments(data?.kids || [], 10), {
        onSuccess: () => {
            refetchUserSubmissions();
        },
        enabled: !!data,
    });

    const {
        data: userSubmissions,
        refetch: refetchUserSubmissions,
        isFetching: isFetchingUserSubmissions,
        isLoading: isLoadingUserSubmissions,
    } = useQuery(
        `get-top-10-comments-user-submission-count-${id}`,
        async () => {
            const counts = [];

            for (const comment of comments || []) {
                const count = await getHNUserSubmittedCount(comment.by);
                counts.push(count);
            }

            return counts;
        },
        {
            enabled: !!comments,
        }
    );

    return (
        <Layout>
            <Head>
                <title>{data?.title} | Hacker News Top 30</title>
            </Head>

            <div className="bg-gray-100 mb-2 p-2">
                <h1 className="text-xl">{data?.title}</h1>
                <div>
                    <span className="text-sm">by: {data?.by}</span>
                </div>
            </div>
            <div className="flex justify-between my-2">
                <span className="text-sm">
                    {(isLoading || isLoadingComments || isLoadingUserSubmissions) && 'Loading...'}
                </span>
                <button
                    className={`flex items-center justify-center py-1 px-2 text-sm ${
                        isFetching || isFetchingComments || isFetchingUserSubmissions
                            ? 'text-gray-300'
                            : 'hover:underline hover:text-orange-600'
                    }`}
                    onClick={() => refetch()}
                    disabled={isFetching || isFetchingComments || isFetchingUserSubmissions}
                    data-tip={`Last refresh ${dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleString() : 'never'}`}
                >
                    <span className="mr-2">Refresh</span>{' '}
                    <RefreshIcon
                        className={`w-4 h-4 ${
                            (isFetching || isFetchingComments || isFetchingUserSubmissions) && 'animate-spin'
                        }`}
                    />
                </button>
            </div>
            <table
                className={`text-xs bg-gray-100 w-full ${
                    (isFetching || isFetchingComments || isFetchingUserSubmissions) && 'text-gray-400'
                }`}
            >
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
                                {(userSubmissions || [])[i]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
};

export default Item;
