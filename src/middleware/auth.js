export default function(next, store) {
  if (!store.state.isLoggedIn) {
    next("/");
    //没有登陆，要求登陆
    store.commit("setIsLoginOpen", true);
  } else {
    next();
  }
}
