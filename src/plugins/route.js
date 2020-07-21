import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../view/admin/Dashboard';
import DashboardPage from '../view/admin/dashboard/DashboardPage';
import ExamPage from '../view/admin/exam/ExamPage';
import addQuestion from '../view/admin/exam/components/addQuestion.vue';
import ExamForm from '../view/admin/exam/ExamForm';
import questionForm from '../view/admin/exam/page/questionForm.vue'
import NotificationPage from '../view/admin/notification/NotificationPage';
import AppPage from '../view/admin/app/AppPage';
import AboutPage from '../view/admin/about/AboutPage';
import Sample from '../view/admin/Sample';
import questionNumerical from '../view/admin/exam/page/questionNumerical.vue';
import Home from '../view/Home'
import ForgotPassword from '../view/ForgotPassword.vue'
// import SignIn from '../view/SignIn'
// import Register from '../view/Register'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/forgot-password',
            name: 'forgotPassword',
            component: ForgotPassword
        },
        {
            path: '/admin',
            component: Dashboard,
            name: 'Admin',
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: 'sample',
                    name: 'Sample',
                    component: Sample
                },
                {
                    path: '/',
                    name: 'Dashboard',
                    component: DashboardPage
                },
               
                {
                    path: 'exam',
                    name: 'Exam',
                    component: ExamPage
                },
                {
                    path:'addQuestion',
                    name:'addQuestion',
                    component:addQuestion
                },
                {
                    path:'numerical-question/:examId',
                    name:'numerical-question',
                    component:questionNumerical
                },
                {
                    path: 'new-exam',
                    name: 'new-exam',
                    component: ExamForm,
                },
                {
                    path:'question-form/:examId/:sectionIdx/:questionId',
                    name:'question-form',
                    component:questionForm
                },
                {
                    path: 'edit-exam/:examId',
                    name: 'edit-exam',
                    component: ExamForm,
                },
                {
                    path: 'notification',
                    name: 'Notification',
                    component: NotificationPage
                },
                {
                    path: 'app',
                    name: 'App',
                    component: AppPage
                },
                {
                    path: 'about',
                    name: 'About',
                    component: AboutPage
                },
                
            ]
        }
    ],
    mode: 'history'
});
