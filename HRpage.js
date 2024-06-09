import{
    get,
    set,
    getMany,
    setMany,
    update,
    del,
    clear,
    keys,
    values,
    entries,
    createStore,
} from 'https://cdn.jsdelivr.net/npm/idb-keyval@5.dist/esm/index.js';

set ('user-id', Date())
  .then(() => {
    console.log('saved the user-id');
  })
  .catch(console.warn)




