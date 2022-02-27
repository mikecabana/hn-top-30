import { HNItem } from '../models/hacker-news/hn-item.interface';
import { HNUser } from '../models/hacker-news/hn-user.interface';
import { makeRequest } from './helpers';

/**
 * Get the top 500 news stories at hacker news
 *
 */
export const getHNTopStories = async () => {
    const data = await makeRequest<number[]>('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');

    return data;
};

/**
 * Gets the hacker news item by it's id
 *
 */
export const getHNItem = async (id: number) => {
    const data = await makeRequest<HNItem>(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);

    return data;
};

/**
 * Gets the hacker news user by it's id
 *
 */
export const getHNUser = async (id: string) => {
    const data = await makeRequest<HNUser>(`https://hacker-news.firebaseio.com/v0/user/${id}.json?print=pretty`);

    return data;
};
