/**
 * Mutation helper function for Zustand
 * @param {*} set zustand set function
 * @param {*} key target state
 * @param {*} param value to add
 * @returns updated target state
 */
export const mutator = (set: any, key: string) => (param: any) => {
  set(() => ({
    [key]: param,
    updateMade: true,
  }));
};
