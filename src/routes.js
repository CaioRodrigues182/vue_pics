import Cadastro from './componentes/cadastro/Cadastro.vue';
import Home from './componentes/home/Home.vue';

export const routes = [
    {path: '', component: Home, name: 'home',  titulo : 'Home', menu: true },
    {path: '/cadastro', name: 'cadastro', component: Cadastro, titulo: 'Cadastro', menu: true},
    {path: '/cadastro/:id', name: 'altera', component: Cadastro, titulo: 'Altera', menu: false},
    {path: '*', component: Home, menu: false}
];