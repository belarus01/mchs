import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from "../components/RequireRoles";
import MainLayout from "../layout/MainLayout";
import UserAdminPage from '../pages/UserAdminPage';
import DepartmentsPage from '../pages/DepartmentsPage';
import LoginPage from '../pages/LoginPage';
import RequireRoles from '../components/RequireRoles';
import { ROLES } from '../shared/constants';
import ServerStatisticsPage from '../pages/ServerStatisticsPage';
import StrDepartmentsPage from '../pages/StrDepartmentsPage';
import SubjectsPage from '../pages/SubjectsPage';
import SSoatoPage from '../pages/SSoatoPage';
import EventsPage from '../pages/EventsPage';
import LocationPage from '../pages/LocationPage';
import PlanPage from '../pages/PlanPage';

const DASHBOARD_PATH = '/';
const MAINLAYOUT_ALLOWED_ROLES = ['syperadmin', 'admin', 'moderator', 'user'];

const AppRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={DASHBOARD_PATH} element={<MainLayout/>}>
                    <Route element={<RequireRoles allowedRoles={[ROLES.User, ROLES.Сhief, ROLES.Syperadmin, ROLES.Admin]}/>}>

                    </Route>
                    <Route element={<RequireRoles allowedRoles={[ROLES.Syperadmin]}/>}>
                       
                    </Route>

                    <Route element={<RequireRoles allowedRoles={[ROLES.Syperadmin, ROLES.Admin]}/>}>
                        
                        
                    </Route>
                    <Route path='users' element={<UserAdminPage/>}/>
                    <Route path='deps' element={<DepartmentsPage/>}/>
                    <Route path='strdeps' element={<StrDepartmentsPage/>}/>
                    <Route path='audit' />
                    <Route path='subjects' element={<SubjectsPage/>}/>
                    <Route path='soato' element={<SSoatoPage/>}/>
                    <Route path='events' element={<EventsPage/>}/>
                    <Route path='location' element={<LocationPage/>}/>
                    <Route path='statistics' element={<ServerStatisticsPage/>}/>
                    <Route path='plan' element={<PlanPage/>}/>
                </Route>
                
                <Route path='/signin' element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;