"use client";

import { useBookingService } from "@/hook/useBookingInit";
import { BookingItem } from "@/types/bookings";
import { PaymentFormProps} from "@/types/payment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function PaymentForm({
  token,
  items,
  totalPrice,
}: PaymentFormProps) {
  const {loading, method, setMethod, handleConfirm } = useBookingService(token, items);
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold">Thanh toán</h2>

      {/* Payment method */}
      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={method === "qr"}
            onChange={() => setMethod("qr")}
          />
          Thanh toán QR (VNPay / Momo)
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          Thẻ tín dụng / ghi nợ
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={method === "stay"}
            onChange={() => setMethod("stay")}
          />
          Thanh toán tại khách sạn
        </label>
      </div>

      {/* Render theo method */}
      <div className="border rounded-xl p-4 bg-gray-50">
        {method === "qr" && <QRPayment />}
        {method === "card" && <CardPayment />}
        {method === "stay" && <PayAtHotel />}
      </div>

      {/* Tổng tiền */}
      <div className="text-right font-semibold">
        Tổng tiền:{" "}
        <span className="text-blue-600">
          {totalPrice.toLocaleString("vi-VN")} VNĐ
        </span>
      </div>

      {/* Confirm */}
      <button
        onClick={handleConfirm}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-orange-400 transition disabled:opacity-50"
      >
        {loading ? "Đang xử lý..." : "Xác nhận đặt"}
      </button>
    </div>
  );
}


function QRPayment() {
    return (
        <div className="space-y-3 text-center">
            <p className="font-medium">Quét mã để thanh toán</p>

            <div className="flex justify-center gap-6">
                <div className="text-center">
                    <div className="w-28 h-28 bg-gray-300 rounded-lg flex items-center justify-center">
                        QR
                    </div>
                    <p className="text-sm mt-1">VNPay</p>
                </div>

                <div className="text-center">
                    <div className="w-28 h-28 bg-gray-300 rounded-lg flex items-center justify-center">
                        QR
                    </div>
                    <p className="text-sm mt-1">Momo</p>
                </div>
            </div>
        </div>
    );
}

function CardPayment() {
    return (
        <div className="space-y-3">
            <input
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Số thẻ"
            />
            <div className="flex gap-3">
                <input
                    className="w-1/2 border rounded-lg px-3 py-2"
                    placeholder="MM/YY"
                />
                <input
                    className="w-1/2 border rounded-lg px-3 py-2"
                    placeholder="CVV"
                />
            </div>
            <input
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Tên chủ thẻ"
            />
        </div>
    );
}

function PayAtHotel() {
    return (
        <div className="text-sm text-gray-600 space-y-2">
            <p>
                Bạn sẽ thanh toán trực tiếp tại khách sạn khi nhận phòng.
            </p>
            <p className="text-green-600 font-medium">
                ✔ Không cần thanh toán trước
            </p>
        </div>
    );
}
