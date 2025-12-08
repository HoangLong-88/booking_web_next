function AttractionFeatures() {
  const items = [
    {
      icon: "👥",
      title: "Khám phá các địa điểm tham quan hàng đầu",
      desc: "Trải nghiệm những điều tuyệt vời nhất tại điểm đến với các địa điểm tham quan, tour và nhiều hoạt động khác"
    },
    {
      icon: "📅",
      title: "Nhanh chóng và linh hoạt",
      desc: "Đặt vé online trong vài phút ở nhiều địa điểm tham quan"
    },
    {
      icon: "🎧",
      title: "Được trợ giúp khi bạn cần",
      desc: "Đội ngũ Dịch vụ Khách hàng SKYLINK sẽ luôn có mặt để hỗ trợ bạn 24/7"
    }
  ];

  return (
    <div className="w-full ">
      <h2 className="text-2xl font-bold mb-5 text-orange-300">
        Khám phá các hoạt động trải nghiệm qua SKYLINK
      </h2>

      <div className="grid md:grid-cols-3 gap-10 bg-sky-100 px-5 py-10 flex mb-12 rounded-xl border-3 border-orange-300 ">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="text-2xl">{item.icon}</div>

            <div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className=" text-sm text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export {AttractionFeatures}
