'use server';

import loadData from "./loadData";
import type { User } from '@/app/lib/definitions';

const getUser = async (name: string): Promise<User | undefined> => {
    const data = await loadData('app/data/example_users.json');
    let parsed_data: User[] | null = JSON.parse(data)?.users;

    if (parsed_data) {
        for (const user of parsed_data) {
            if (user.name === name) {
                return user;
            }
        }
        return undefined;
    }else{
            console.error('No such user:', name);
            throw new Error('No such user:' + name);
    }
}


export default getUser