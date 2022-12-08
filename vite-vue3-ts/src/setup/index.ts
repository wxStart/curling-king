import router from '../router';
import store from '../store';
import { executor } from '../utils/require';

const files = import.meta.glob('./*.pre.ts', { eager: true });

const init = () => {
  executor(files, { router, store });
  return {
    router,
    store,
  };
};

export { init };
