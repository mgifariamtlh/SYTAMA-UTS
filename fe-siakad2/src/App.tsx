import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './Pages/Dashboard';
import MahasiswaLayout from '@/Pages/Mahasiswa/index';
import MahasiswaList from '@/Pages/Mahasiswa/MahasiswaList';
import MahasiswaForm from '@/Pages/Mahasiswa/MahasiswaForm';
import MatkulLayout from '@/Pages/MataKuliah/index';
import MatkulList from '@/Pages/MataKuliah/MatkulList';
import MatkulForm from '@/Pages/MataKuliah/MatkulForm';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mahasiswa" element={<MahasiswaLayout />}>
            <Route index element={<MahasiswaList />} />
            <Route path="newx" element={<MahasiswaForm />} />
          </Route>
          <Route path="/matakuliah" element={<MatkulLayout />}>
            <Route index element={<MatkulList />} />
            <Route path="new" element={<MatkulForm />} />
            <Route path="edit/:kode" element={<MatkulForm />} />
          </Route>
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

