import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/layouts/AppLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { CreateProjectView } from '@/views/projects/CreateProjectView';
import { DashboardView } from '@/views/DashboardView';
import { EditProjectView } from '@/views/projects/EditProjectView';
import { LoginView } from './views/auth/LoginView';
import { ProjectDetailsView } from '@/views/projects/ProjectDetailsView';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />}></Route>
          <Route
            path="/projects/create"
            element={<CreateProjectView />}
          ></Route>
            <Route
              path="/projects/:projectId"
              element={<ProjectDetailsView />}
            ></Route>
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
          ></Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/auth/login' element={<LoginView />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
