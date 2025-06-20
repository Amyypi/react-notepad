import { Routes, Route } from 'react-router-dom';
import NoteListPage from '../features/notes/pages/NoteListPage.jsx';
import NoteFullViewPage from '../features/notes/pages/NoteFullViewPage.jsx';
import WorkspaceDashboard from '../features/workspace/pages/Dashboard.jsx';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<NoteListPage />} />
            <Route path="/notes" element={<NoteListPage />} />
            <Route path="/notes/:id" element={<NoteFullViewPage />} />
            <Route path="/workspace" element={<WorkspaceDashboard />} />
        </Routes>
    );
}

export default AppRoutes;