/**
 * AppRouter — React Router declarative routing
 *
 * @ layer routing
 * @ routes / → TodoPage
 * @ routes * → redirect to /
 */

import { Routes, Route, Navigate } from 'react-router-dom';

import { TodoPage } from '@/presentation/pages/TodoPage/TodoPage';
import { ROUTES } from '@/constants';

export function AppRouter() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<TodoPage />} />
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
    );
}
