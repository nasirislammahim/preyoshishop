import React, { useState } from 'react';
import { X, User, Phone, MapPin, Package, LogOut, Printer, Edit2, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { InvoiceView } from '../orders/InvoiceView';
import { Order } from '../../types';

export const CustomerProfileModal: React.FC = () => {
  const { isProfileOpen, setIsProfileOpen, orders, setIsOrderTrackingOpen } = useStore();
  const { currentUser, logout, updateProfile, isAdmin } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editAddress, setEditAddress] = useState(currentUser?.address || '');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  if (!isProfileOpen || !currentUser) return null;

  // Filter orders made by or matching this user's phone
  const userOrders = orders.filter(
    o => (o.userId && o.userId === currentUser.id) || o.phone.replace(/[^0-9]/g, '') === currentUser.phone.replace(/[^0-9]/g, '')
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName.trim(),
      phone: editPhone.trim(),
      address: editAddress.trim()
    });
    setIsEditing(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
        <div className="relative w-full max-w-2xl bg-[#FFF9F2] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#7A1238]/20 my-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#7A1238] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold font-bangla text-base sm:text-lg text-[#2A101A]">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {currentUser.role === 'admin' ? 'Preyoshi Administrator' : 'সম্মানিত কাস্টমার'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  logout();
                  setIsProfileOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">লগআউট</span>
              </button>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Profile Details & Edit */}
          <div className="py-5 border-b border-gray-200">
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-3 bg-white p-4 rounded-2xl border border-gray-200">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">আপনার নাম:</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">মোবাইল নম্বর:</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">ডেলিভারি ঠিকানা:</label>
                  <input
                    type="text"
                    value={editAddress}
                    onChange={e => setEditAddress(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#7A1238] text-white text-xs font-bold rounded-lg flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>সংরক্ষণ করুন</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#7A1238]" />
                    <span>মোবাইল: <strong className="text-gray-900">{currentUser.phone}</strong></span>
                  </div>
                  {currentUser.email && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">@</span>
                      <span>ইমেইল: {currentUser.email}</span>
                    </div>
                  )}
                  {currentUser.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#7A1238]" />
                      <span>ঠিকানা: {currentUser.address}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3.5 py-1.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-[#F8E8E9] hover:text-[#7A1238] text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>তথ্য সংশোধন</span>
                </button>
              </div>
            )}
          </div>

          {/* Past Orders History */}
          <div className="pt-5 space-y-4">
            <h4 className="text-sm font-bold font-bangla text-gray-900 flex items-center justify-between">
              <span>আপনার পূর্ববর্তী অর্ডার হিস্টোরি ({userOrders.length})</span>
            </h4>

            {userOrders.length === 0 ? (
              <div className="p-6 bg-white rounded-2xl border border-gray-200 text-center text-xs text-gray-500 font-bangla">
                আপনার কোনো পূর্ববর্তী অর্ডার রেকর্ড নেই।
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {userOrders.map(order => (
                  <div
                    key={order.id}
                    className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gray-900">{order.orderNumber}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            order.status === 'delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-[#F8E8E9] text-[#7A1238]'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 font-bangla">
                        {order.items.map(i => `${i.nameBn} (x${i.quantity})`).join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <span className="font-extrabold text-sm text-[#7A1238]">
                        ৳{order.grandTotal.toLocaleString()}
                      </span>
                      <button
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-[#7A1238] hover:bg-[#F8E8E9]"
                        title="Print Invoice"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedInvoiceOrder && (
        <InvoiceView order={selectedInvoiceOrder} onClose={() => setSelectedInvoiceOrder(null)} />
      )}
    </>
  );
};
