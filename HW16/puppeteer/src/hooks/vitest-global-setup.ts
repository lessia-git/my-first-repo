import { initGlobal } from '../global';

console.log('global hook');
initGlobal();

export const mochaGlobalSetup = (): void => {
    initGlobal();
};
