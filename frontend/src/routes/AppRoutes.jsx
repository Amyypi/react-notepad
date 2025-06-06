import { Routes, Route } from 'react-router-dom';
import Home from '../features/workspace/pages/Home.jsx';
import NoteListPage from '../features/notes/pages/NoteList.jsx';
import NoteViewPage from '../features/notes/pages/NoteView.jsx';
import WorkspaceDashboard from '../features/workspace/pages/Dashboard.jsx';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<NoteListPage />} />
            <Route path="/notes/:id" element={<NoteViewPage />} />
            <Route path="/workspace" element={<WorkspaceDashboard />} />
        </Routes>
    );
}

export default AppRoutes;