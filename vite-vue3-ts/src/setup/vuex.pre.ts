import { executor } from '../utils/require';

const files = import.meta.glob('../store/*.vuex.ts', { eager: true });

export default (payload: unknown) => {
  executor(files, payload);
};
