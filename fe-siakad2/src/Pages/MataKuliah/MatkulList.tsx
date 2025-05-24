import { useEffect, useState } from 'react';
import { getMatkul, deleteMatkul } from '@/services/api';
import type { MataKuliahType } from '@/types/MataKuliah';
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function MatkulList() {
  const [data, setData] = useState<MataKuliahType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 5;

  // useEffect(() => {
  //   getMatkul()
  //     .then((res) => setData(res.data as MataKuliahType[]))
  //     .catch(() => alert('Gagal mengambil data Mata Kuliah'));
  // }, []);
  // .then((res) => setData(res.data as MataKuliahType[]))

  const fetchData = async () => { //get data matkul
    try {
      const res = await getMatkul();
      setData(res.data);
    } catch {
      alert('Gagal mengambil data Mata Kuliah');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (kode: string) => {
    navigate(`/matakuliah/edit/${kode}`);
  };

  const handleDelete = async (kode: string) => {
    const confirmDelete = window.confirm(`Yakin ingin menghapus mata kuliah dengan kode "${kode}"?`);
    if (!confirmDelete) return;

    try {
      await deleteMatkul(kode);
      alert(`Mata kuliah dengan kode "${kode}" berhasil dihapus.`);
      fetchData(); // refresh data setelah delete
    } catch (err) {
      alert('Gagal menghapus data Mata Kuliah.');
      console.error(err);
    }
  };
  

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3 border text-center">Kode</th>
              <th className="px-4 py-3 border text-center">Mata Kuliah</th>
              <th className="px-4 py-3 border text-center">SKS</th>
              <th className="px-4 py-3 border text-center">Semester</th>
              <th className="px-4 py-3 border text-center">Jurusan</th>
              <th className="px-4 py-3 border text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {pageData.map((matkul) => (
              <tr key={matkul.kode} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{matkul.kode}</td>
                <td className="px-4 py-2 border">{matkul.nama}</td>
                <td className="px-4 py-2 border">{matkul.sks}</td>
                <td className="px-4 py-2 border text-center">{matkul.semester}</td>
                <td className="px-4 py-2 border">{matkul.jurusan}</td>
                <td className="px-4 py-2 border text-center">
                  <button className="bg-yellow-300 text-white px-4 py-2 rounded m-1" onClick={() => handleEdit(matkul.kode)}>
                    <Pencil size={18} />
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded m-1" onClick={() => handleDelete(matkul.kode)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Tidak ada data Mata Kuliah.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded ${
              currentPage === i + 1
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-800 border'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
