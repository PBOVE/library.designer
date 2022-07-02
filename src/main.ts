import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import PluginsIniter from './plugins/plugins-initer';
import 'virtual:windi.css';
import '@/assets/css/global.less';
import '@/assets/css/ant.variable.less';

const app = createApp(App);

// 设置路由
setupRouter(app);

// 设置插件
PluginsIniter.init(app);

app.mount('#app');
