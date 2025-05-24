import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createMatkul, getMatkulByKode, updateMatkul } from '@/services/api';
import type { MataKuliahType } from '@/types/MataKuliah';

const initialForm: MataKuliahType = {
  kode: '',
  nama: '',
  sks: 0,
  semester: '',
  jurusan: '',
};

export default function MatkulForm() {
  const [form, setForm] = useState<MataKuliahType>(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { kode } = useParams();
  const navigate = useNavigate();

  useEffect(() => { //get matkul berdasarkan kode ketika mode edit
    if (kode) {
      (async () => {
        try {
          const res = await getMatkulByKode(kode);
          setForm(res.data);
        } catch (err) {
          alert('Gagal mengambil data mata kuliah.');
        }
      })();
    }
  }, [kode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'sks' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Reset error sebelumnya
    try {
      if (kode) { //edit data
        await updateMatkul(kode, form);
      } else { //tambah data
        await createMatkul(form);
      }
      navigate('/matakuliah');
    } catch (err: any) {
      if (err.response && err.response.data && Array.isArray(err.response.data.message)) {
        // Ambil dan simpan error validasi dari NestJS
        const validationErrors = err.response.data.message;
        const formattedErrors = Object.fromEntries(
          validationErrors.map((e: any) => [e.field, e.messages])
        );
        setErrors(formattedErrors);
      }else if (err.response && err.response.status === 409 && err.response.data.message) {
        // ERROR KETIKA MENCOBA INPUT DATA DENGAN KODE MATKUL YANG SAMA
        setErrors({
          kode: [err.response.data.message], 
        });
      } else {
        alert('Gagal menyimpan data Mata Kuliah');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-6">
        {kode ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah'}
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Kode</label>
          <input
            name="kode"
            type="text"
            value={form.kode}
            onChange={handleChange}
            required
            disabled={!!kode} // disable kode ketika mode edit data
            className="w-full px-3 py-2 border rounded"
          />
          {errors.kode && errors.kode.map((msg, idx) => (
            <p key={idx} style={{ color: 'red' }}>{msg}</p>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mata Kuliah</label>
          <input
            name="nama"
            type="text"
            value={form.nama}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">SKS</label>
          <input
            name="sks"
            type="number"
            value={form.sks}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Semester</label>
          <input
            name="semester"
            type="text"
            value={form.semester}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Jurusan</label>
          <input
            name="jurusan"
            type="text"
            value={form.jurusan}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="md:col-span-2 flex justify-between mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : kode ? 'Perbarui' : 'Simpan'}
            {/* {loading ? 'Menyimpan...' : 'Simpan'} */}
          </button>
          <button
            type="button"
            onClick={() => navigate('/matakuliah')}
            className="text-sm text-gray-500 hover:underline"
          >
            Batal / Kembali
          </button>
        </div>
      </form>
    </div>
  );
}
