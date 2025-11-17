'use client';
import { useState } from "react";

function ActivitesMenu() {
    const menuData = [
        {
            title: 'Tours',
            content: [
                {
                    name: "Lễ hội lồng đèn",
                    img: "https://static.vinwonders.com/production/Le-hoi-den-long-hoi-an-8.jpg"
                },
                {
                    name: "Tour văn hóa",
                    img: "https://res.klook.com/image/upload/c_fill,w_680,h_456/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/l8spimvndlajipqndzlc.jpg"
                },
                {
                    name: "Trải nghiệm độc lạ",
                    img: "https://kenh14cdn.com/203336854389633024/2023/2/4/photo-6-16754953703071600706270.jpg"
                },
                {
                    name: "Tour đạp xe leo núi",
                    img: "https://media.vov.vn/sites/default/files/styles/large/public/2020-11/anh_2_3.jpg"
                },
                {
                    name: "Bữa tối trên du thuyền",
                    img: "https://lanhabaycruises.vn/wp-content/uploads/2019/10/paradise-grand-cruise-lan-ha-bay-5.jpg"
                }
            ]
        },
        {
            title: 'Tours thành phố',
            content: [
                {
                    name: "Lễ hội lồng đèn",
                    img: "https://static.vinwonders.com/production/Le-hoi-den-long-hoi-an-8.jpg"
                },
                {
                    name: "Tour văn hóa",
                    img: "https://res.klook.com/image/upload/c_fill,w_680,h_456/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/l8spimvndlajipqndzlc.jpg"
                },
                {
                    name: "Trải nghiệm độc lạ",
                    img: "https://kenh14cdn.com/203336854389633024/2023/2/4/photo-6-16754953703071600706270.jpg"
                },
                {
                    name: "Tour đạp xe leo núi",
                    img: "https://media.vov.vn/sites/default/files/styles/large/public/2020-11/anh_2_3.jpg"
                },
                {
                    name: "Bữa tối trên du thuyền",
                    img: "https://lanhabaycruises.vn/wp-content/uploads/2019/10/paradise-grand-cruise-lan-ha-bay-5.jpg"
                }
            ]
        },
        {
            title: 'Bảo tàng',
            content: [
                {
                    name: "Bảo tàng lịch sử trưng bày",
                    img: "https://evivatour.com/wp-content/uploads/2021/08/Vietnam-national-museum-of-History.jpg"
                },
                {
                    name: "Bảo tàng lịch sử tự nhiên",
                    img: "https://www.vivutravel.com/images/Blogs46/visa-to-vietnam.jpg"
                }
            ]
        },
        {
            title: 'Dịch vụ du lịch đi lại',
            content: [
                {
                    name: "Lễ hội lồng đèn",
                    img: "https://static.vinwonders.com/production/Le-hoi-den-long-hoi-an-8.jpg"
                },
                {
                    name: "Tour văn hóa",
                    img: "https://res.klook.com/image/upload/c_fill,w_680,h_456/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/l8spimvndlajipqndzlc.jpg"
                },
                {
                    name: "Trải nghiệm độc lạ",
                    img: "https://kenh14cdn.com/203336854389633024/2023/2/4/photo-6-16754953703071600706270.jpg"
                },
                {
                    name: "Tour đạp xe leo núi",
                    img: "https://media.vov.vn/sites/default/files/styles/large/public/2020-11/anh_2_3.jpg"
                },
                {
                    name: "Bữa tối trên du thuyền",
                    img: "https://lanhabaycruises.vn/wp-content/uploads/2019/10/paradise-grand-cruise-lan-ha-bay-5.jpg"
                }
            ]
        },
        {
            title: 'Hoạt động ngoài trời',
            content: [
                {
                    name: "Thuê tàu thuyền",
                    img: "https://static.vinwonders.com/production/Le-hoi-den-long-hoi-an-8.jpg"
                },
                {
                    name: "Công viên thiên nhiên",
                    img: "https://res.klook.com/image/upload/c_fill,w_680,h_456/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/l8spimvndlajipqndzlc.jpg"
                },
                {
                    name: "Trải nghiệm độc lạ",
                    img: "https://kenh14cdn.com/203336854389633024/2023/2/4/photo-6-16754953703071600706270.jpg"
                },
                {
                    name: "Tour đạp xe leo núi",
                    img: "https://media.vov.vn/sites/default/files/styles/large/public/2020-11/anh_2_3.jpg"
                },
                {
                    name: "Bữa tối trên du thuyền",
                    img: "https://lanhabaycruises.vn/wp-content/uploads/2019/10/paradise-grand-cruise-lan-ha-bay-5.jpg"
                }
            ]
        },
        {
            title: 'Lớp học & workshops',
            content: [
                {
                    name: "Lễ hội lồng đèn",
                    img: "https://static.vinwonders.com/production/Le-hoi-den-long-hoi-an-8.jpg"
                },
                {
                    name: "Tour văn hóa",
                    img: "https://res.klook.com/image/upload/c_fill,w_680,h_456/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/l8spimvndlajipqndzlc.jpg"
                },
                {
                    name: "Trải nghiệm độc lạ",
                    img: "https://kenh14cdn.com/203336854389633024/2023/2/4/photo-6-16754953703071600706270.jpg"
                },
                {
                    name: "Tour đạp xe leo núi",
                    img: "https://media.vov.vn/sites/default/files/styles/large/public/2020-11/anh_2_3.jpg"
                },
                {
                    name: "Bữa tối trên du thuyền",
                    img: "https://lanhabaycruises.vn/wp-content/uploads/2019/10/paradise-grand-cruise-lan-ha-bay-5.jpg"
                }
            ]
        },
        {
            title: 'Show thưởng thức & giải trí',
            content: [
                {
                    name: "Lễ hội lồng đèn",
                    img: "https://static.vinwonders.com/production/Le-hoi-den-long-hoi-an-8.jpg"
                },
                {
                    name: "Tour văn hóa",
                    img: "https://res.klook.com/image/upload/c_fill,w_680,h_456/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/l8spimvndlajipqndzlc.jpg"
                },
                {
                    name: "Trải nghiệm độc lạ",
                    img: "https://kenh14cdn.com/203336854389633024/2023/2/4/photo-6-16754953703071600706270.jpg"
                },
                {
                    name: "Tour đạp xe leo núi",
                    img: "https://media.vov.vn/sites/default/files/styles/large/public/2020-11/anh_2_3.jpg"
                },
                {
                    name: "Bữa tối trên du thuyền",
                    img: "https://lanhabaycruises.vn/wp-content/uploads/2019/10/paradise-grand-cruise-lan-ha-bay-5.jpg"
                }
            ]
        }
    ];

    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedMenu = menuData[selectedIndex];

    return (
        <>
            <div className="flex gap-7 py-5 text-sm">
                {menuData.map((menu, index) => {
                    return (
                        <>
                            <button
                                key={menu.title}
                                className="px-2 h-10 hover:bg-orange-200 hover:text-sky-800 rounded-2xl transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-sky-400"
                                onClick={() => { setSelectedIndex(index) }}
                            >
                                {menu.title}
                            </button>
                        </>
                    )
                })}
            </div>
            {selectedMenu.title && (
                <div className="grid grid-cols-4 md:grid-cols-5 gap-4 mt-6">
                    {selectedMenu.content?.map((item, i) => {
                        return (
                            <div key={i} className="rounded-xl shadow bg-white outline-2 outline-offset-2 outline-sky-400">
                                <img src={item.img} className="w-full h-40 object-cover rounded-t-xl"/>
                                <p className="p-3 font-medium text-sm">{item.name}</p>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export { ActivitesMenu }