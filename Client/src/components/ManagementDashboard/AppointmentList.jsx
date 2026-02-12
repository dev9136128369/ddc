import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Calendar, Phone, Mail, User, Clock, Loader2, AlertCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api/contact';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      setAppointments(response.data);
    } catch (err) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        setAppointments(appointments.filter(app => app._id !== id));
      } catch (err) {
        alert("Error deleting record");
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-10 h-10 text-[#F68D22] animate-spin mb-4" />
      <p className="text-slate-400">Fetching Appointments...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="text-[#F68D22]" size={20} /> Recent Inquiries
        </h2>
        <span className="bg-[#F68D22]/10 text-[#F68D22] px-3 py-1 rounded-full text-xs font-bold border border-[#F68D22]/20">
          Total: {appointments.length}
        </span>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-2">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#1e293b]/30">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-slate-300 text-xs uppercase tracking-wider font-bold">
              <th className="p-4 border-b border-white/5">Patient</th>
              <th className="p-4 border-b border-white/5">Contact Info</th>
              <th className="p-4 border-b border-white/5">Service & Date</th>
              <th className="p-4 border-b border-white/5">Message</th>
              <th className="p-4 border-b border-white/5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-slate-500">No appointments found.</td>
              </tr>
            ) : (
              appointments.map((app) => (
                <tr key={app._id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F68D22] to-[#244C68] flex items-center justify-center text-[10px] font-bold">
                        {app.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold text-white">{app.name}</span>
                    </div>
                  </td>
                  <td className="p-4 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Mail size={12} className="text-[#F68D22]" /> {app.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Phone size={12} className="text-[#F68D22]" /> {app.phone}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="block text-xs font-bold text-[#F68D22]">{app.service}</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Calendar size={10} /> {app.date || 'TBD'}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-slate-400 max-w-[200px] truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all">
                      {app.message || 'No message'}
                    </p>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleDelete(app._id)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;