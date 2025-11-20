'use client'
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";


export default function QAItem({ question, answer }: QAProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full border-b border-orange-300 py-4">
      {/* Question Row */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left "
      >
        <span className="font-semibold mx-5">{question}</span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* Answer Content */}
      {open && (
        <div className="mt-4 mx-5 text-sm text-gray-700">{answer}</div>
      )}
    </div>
  );
}

interface QAProps {
  question: string,
  answer: React.ReactNode // lưu JSX
}

// Example usage component
function QAList() {
  const data1 = [
    {
      question: "Tại sao tôi nên đặt thuê xe ở Việt Nam với ?",
      answer: (
        <div>
          <p>
            Chúng tôi tạo điều kiện dễ dàng để bạn tìm xe thuê phù hợp với nhu cầu của mình.
            Sau đây là những gì chúng tôi mang lại:
          </p>

          <ul className="list-disc ml-5 mt-2">
            <li>Bộ sưu tập xe khổng lồ – từ xe hạng nhỏ đến SUV</li>
            <li>Hỗ trợ hơn 30 ngôn ngữ</li>
            <li>Miễn phí hủy đến 48 giờ trước khi nhận xe cho hầu hết các đơn đặt</li>
          </ul>
        </div>
      )
    },
    {
      question: "Tôi cần chuẩn bị gì để thuê một chiếc xe?",
      answer: (
        <div>
          <p className="mb-2">Để đăng ký thuê xe, bạn chỉ cần thẻ tín dụng hoặc ghi nợ.</p>
          <p>Khi tại quầy cho thuê, bạn sẽ cần:</p>
          <ul className="list-disc ml-5 my-3">
            <li>Hộ chiếu</li>
            <li>Voucher</li>
            <li>Bằng lái xe của từng người lái xe</li>
            <li>Thẻ tín dụng của người lái xe chính (một số công ty cho thuê cũng chấp nhận thẻ ghi nợ, nhưng hầu hết sẽ không).</li>
          </ul>
          <p>
            Quan trọng: Hãy bảo đảm bạn cũng kiểm tra các điều khoản thuê xe, vì mỗi công ty cho thuê xe sẽ có những điều lệ riêng.
            Ví dụ: Họ có thể cần xem giấy tờ tùy thân bổ sung. Họ có thể không chấp nhận một số loại thẻ tín dụng nhất định.
            Hoặc họ có thể không cho thuê nếu người lái có bằng lái chưa đủ 36 tháng.
          </p>
        </div>
      )
    },
    {
      question: "Tôi có đủ tuổi để thuê xe?",
      answer: 'Hầu hết các công ty sẽ cho bạn thuê xe nếu bạn từ 21 tuổi trở lên (và một số sẽ cho người lái nhỏ tuổi hơn thuê). Nhưng nếu bạn dưới 25 tuổi, bạn vẫn có thể phải trả "phụ phí tài xế trẻ".'
    }
  ];

  const data2 = [
    {
      question: "Tôi có thể đặt xe cho người yêu, bạn bè, v.v. của mình không?",
      answer: 'Dĩ nhiên. Chỉ cần điền các thông tin về họ trong biểu mẫu "Chi tiết tài xế" khi bạn đặt xe.'
    },
    {
      question: "Tôi cần xem xét những gì khi lựa chọn một chiếc xe?",
      answer: (
        <div>
          <ul className="list-disc ml-5 my-3">
            <li>
              Xem xét về nơi bạn sắp đi.
              Xe Exciter có thể là lựa chọn tuyệt vời khi chạy bon bon trên các đường đèo Hải Vân,
              nhưng xe nhỏ hơn có thể sẽ là lựa chọn hợp lý hơn khi lái ở Rome.
            </li>
            <li>
              Xem người khác nói gì.
              Bạn sẽ tìm thấy rất nhiều đánh giá và điểm đánh giá trên trang web chúng tôi.
              Vì thế hãy tìm hiểu xem những khách hàng khác thích span(và không thích) gì về từng công ty cho thuê.
            </li>
            <li>
              Đừng quên xem xét hộp số.
              Trong một số quốc gia, hầu như ai cũng lái xe số sàn.
              Ở các nước khác, xe số tự động lại là tiêu chuẩn.
              Hãy chắc chắn bạn sẽ thuê chiếc xe bạn có thể lái!
            </li>
          </ul>
        </div>
      )
    },
    {
      question: "Tôi có đủ tuổi để thuê xe?",
      answer: (
        <div>
          <p className="my-2">
            Giá bạn thấy bao gồm xe, bảo hiểm bắt buộc (ví dụ: Bảo hiểm chống trộm cắp, Bảo hiểm hư hại do va chạm) và các loại phí, nếu có, thường được thanh toán khi nhận xe (ví dụ: phí một chiều, phụ phí sân bay hoặc thuế địa phương).
          </p>
          <p className="my-2">
            Giá cũng bao gồm bất kỳ dịch vụ bổ sung nào bạn đã thêm (ví dụ: thiết bị GPS hoặc ghế trẻ em).
          </p>
          <p className="my-2">
            Giá không bao gồm bất kỳ bảo hiểm bổ sung nào bạn mua khi đến quầy cho thuê.
          </p>
          <p className="my-2">
            Mách nhỏ: Có chi tiết giá đầy đủ ở trang Thanh toán.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="grid grid-cols-2">
      <div className="max-w-xl p-4">
        {data1.map((item, i) => (
          <QAItem key={i} question={item.question} answer={item.answer} />
        ))}
      </div>
      <div className="max-w-xl p-4">
        {data2.map((item, i) => (
          <QAItem key={i} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

export { QAList }
