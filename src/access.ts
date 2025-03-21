/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: {
  currentUser?: any | undefined;
}) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.id > 0,
    canSuper: currentUser && currentUser.is_super,
  };
}
