import { getHNItem, getHNTopStories, getHNUser } from '../api/hacker-news';

export const getTopHNNStories = async (n: number) => {
    const data = await getHNTopStories();

    const itemIds = data.slice(0, n);

    const items = [];
    for (const id of itemIds) {
        items.push(await getHNItem(id));
    }

    return items;
};

export const getHNStoryComments = async (kids: number[], n: number) => {
    const itemIds = kids.slice(0, n);

    const items = [];
    for (const id of itemIds) {
        items.push(await getHNItem(id));
    }

    return items;
};

export const getHNUserSubmittedCount = async (id: string) => {
    const user = await getHNUser(id);
    return user.submitted ? user.submitted.length : 0;
};
