import { createRouter, createWebHistory } from "vue-router";
import DcHeros from "./pages/DcHeros";
import Calandar from "./pages/Calandar";
import Home from "./pages/Home";
import Markdown from "./pages/Markdown";
import Slider from "./pages/Slider";
import Caculator from "./pages/Caculator";
import ReuseableModal from "./pages/ReuseableModal";
import Chat from "./pages/Chat";
import UserCrud from "./pages/UserCrud";
import Tensorflow from "./pages/Tensorflow";
import store from "./store/index";

const routes = [
  { path: "/", component: Home },
  { path: "/dc-heros", component: DcHeros },
  { path: "/calandar", component: Calandar },
  { path: "/markdown", component: Markdown },
  { path: "/slider", component: Slider },
  { path: "/caculator", component: Caculator },
  { path: "/reuseableModal", component: ReuseableModal },
  { path: "/user-crud", component: UserCrud },
  { path: "/tensorflow", component: Tensorflow },

  {
    path: "/chat",
    component: Chat,
    meta: { middleware: "auth" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//before going to each router check auth
router.beforeEach((to, __, next) => {
  if (to.meta.middleware) {
    const middleware = require(`./middleware/${to.meta.middleware}`);
    if (middleware) {
      middleware.default(next, store);
    } else next();
  } else {
    next();
  }
});

export default router;
