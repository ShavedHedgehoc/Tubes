import MainLayout from '@/app/main-layout';
import { Summaries } from '@/pages/summaries';
// import { ROUTE_PATH } from '@/shared/constants';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Summaries />,
            },
        ]
    },
]);

export const AppRouter = () => <RouterProvider router={router} />;