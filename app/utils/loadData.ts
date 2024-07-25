'use server';

import { readFileSync } from 'fs'
import path from "path"

const loadData = async (filename: string) => {
    const data = await readFileSync(path.join(process.cwd(), filename), 'utf-8')
    return data
}

export default loadData