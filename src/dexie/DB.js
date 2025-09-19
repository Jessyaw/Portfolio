import Dexie from "dexie";

export const db = new Dexie('TODO');
// await db.delete();
db.version(1).stores({
    Tasks: '++id, data',
});

await db.open();