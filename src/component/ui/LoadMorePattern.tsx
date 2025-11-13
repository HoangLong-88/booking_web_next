'use client'
import { useState } from "react";
import { useEffect } from "react";
import { CustomButton } from "./Button";
import Link from "next/link";

function DestinationsLoadMore() {
    const [images, setImgs] = useState<{
        name: string,
        img_url: string,
        alt: string,
        href: string,
    }[]>([]);
    const [ImgsPerPage, setImgsPerPage] = useState(8);
    const [page, setPage] = useState(1)

    const destinations = [
        {
            name: 'Hanoi',
            img_url: 'https://www.explorevietnam.com.vn/ha-noi/wp-content/uploads/2024/05/Hanoi-Train-Street-Vietnam.png',
            alt: 'Hanoipic',
            href: '/attractions',
        },
        {
            name: 'Danang',
            img_url: 'https://besthuecitytour.com/wp-content/uploads/2020/08/Dragon-Bridge-Da-Nang-Best-Hue-City-Tour-Travel-4.jpg',
            alt: 'Danangpic',
            href: '/attractions',
        },
        {
            name: 'Hoi An',
            img_url: 'https://cdn.prod.website-files.com/688b6913c3c8d6d8cc02f207/690f10970ea39cf8f475acf9_things-to-do-in-hoi-an.jpeg',
            alt: 'HoiAnpic',
            href: '/attractions',
        },
        {
            name: 'Da Lat',
            img_url: 'https://i.ex-cdn.com/theinvestor.vn/files/content/2023/02/15/da-lat-thang-0920.jpg',
            alt: 'DaLatPic',
            href: '/attractions',
        },
        {
            name: 'Ninh Binh',
            img_url: 'https://hanoiexploretravel.com/wp-content/uploads/2022/03/vu-lam-citadel-768x576.jpg',
            alt: 'NinhBinhpic',
            href: '/attractions',
        },
        {
            name: 'Ho Chi Minh City',
            img_url: 'https://www.dalattrip.com/fly/wp-content/uploads/2018/05/Saigon-800x503.jpg',
            alt: 'HCMCitypic',
            href: '/attractions',
        },
        {
            name: 'Ha Giang',
            img_url: 'https://impresstravel.com/wp-content/uploads/2021/04/Ha-Giang-Trekking-Tours.jpg',
            alt: 'HaGiangpic',
            href: '/attractions',
        },
        {
            name: 'Ha Long Bay',
            img_url: 'https://recmiennam.com/wp-content/uploads/2018/01/hinh-anh-vinh-ha-long-15.jpg',
            alt: 'HaLongBaypic',
            href: '/attractions',
        },
        {
            name: 'Hue',
            img_url: 'https://www.hueriversidevilla.com/frontend/home/images/img_tour_4.jpg ',
            alt: 'Hanoipic',
            href: '/attractions',
        },
        {
            name: 'Lao Cai',
            img_url: 'https://www.guidevietnam.org/wp-content/uploads/2020/07/Sapa-trong-may-mu.jpg',
            alt: 'LaoCaipic',
            href: '/attractions',
        },
        {
            name: 'Nha Trang',
            img_url: 'https://bomanhatrang.com/wp-content/uploads/2023/04/bai-bien-nha-trang-1.jpg',
            alt: 'NhaTrangpic',
            href: '/attractions',
        },
        {
            name: 'Phu Quoc',
            img_url: 'https://anhdephd.vn/wp-content/uploads/2022/05/anh-dao-phu-quoc-voi-thuyen-du-lich.jpg',
            alt: 'PhuQuocpic',
            href: '/attractions',
        },
        {
            name: 'Vung Tau',
            img_url: 'https://www.vietnamonline.com/media/uploads/froala_editor/images/VNo-vungtau11.jpg',
            alt: 'VungTaupic',
            href: '/attractions',
        },
        {
            name: 'Can Tho',
            img_url: 'https://jbatravelbox.com/wp-content/uploads/2020/04/Can-Tho-travel-guide.jpg',
            alt: 'CanThopic',
            href: '/attractions',
        },
        {
            name: 'Mui Ne',
            img_url: 'https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/04/Intrepid-Travel-Peregrine-Adventures-vietnam_mui-ne_sand-dunes_131634443.jpg',
            alt: 'Hanoipic',
            href: '/attractions',
        },
        {
            name: 'Quy Nhon',
            img_url: 'https://sayhellovietnam.com/wp-content/uploads/2022/06/Travel-Guide-to-Quy-Nhon.jpg',
            alt: 'QuyNhonpic',
            href: '/attractions',
        },
    ];

    useEffect(() => {
        setImgs(destinations.slice(0, page * ImgsPerPage))
    }, [page])
    console.log(images.length, destinations.length);
    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, id) => {
                    return (
                        <Link
                            key={id}
                            href={image.href}
                            className="relative block"
                        >
                            <img className="rounded-xl h-42 w-full object shadow-xl"
                                src={image.img_url} alt={image.alt} />
                            <p className="absolute text-white m-3 text-lg font-bold bottom-0 flex">
                                {image.name}
                            </p>
                        </Link>
                    )
                })}
            </div>
            {
                images.length !== destinations.length
                &&
                <div className="flex justify-center">
                    <CustomButton
                        size='lg'
                        className="absolute mt-[-25px] rounded-3xl shadow-xl text-white hover:bg-white hover:text-blue-500"
                        onClick={() => setPage(page + 1)}
                    >
                        Xem thêm
                    </CustomButton>
                </div>
            }
        </>
    );

};


export { DestinationsLoadMore }