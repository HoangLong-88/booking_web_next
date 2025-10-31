import Link from "next/link"
export { LateEscapeDeal, FamilyHoliday, CreditCardOffer, DisabledDiscount }
import { CustomButton } from "./Button";

function LateEscapeDeal() {
    return (
        <div className="relative rounded-xl overflow-hidden">
            <img className="w-full h-45 object-cover brightness-70"
                src="https://img.freepik.com/premium-photo/romantic-couple-toasting-with-wine-sunset_14117-864618.jpg" alt="a relaxation couple" />
            <div className="absolute inset-0 items-start py-4 px-5 text-white">
                <p className="pt-2 text-sm">Late escape deal</p>
                <p className="text-2xl font-bold py-1">Go for a good time, not a long time</p>
                <p className="pb-2">Squeeze out the last bit of sun with at least 15% off</p>
                <CustomButton asChild >
                    <Link
                        href="/"
                        className="inline-flex rounded-lg border border-transparent bg-blue-400 px-5 py-3 text-sm
                     font-medium text-white hover:bg-blue-500"
                    >
                        Find deals
                    </Link>
                </CustomButton>
            </div>
        </div>
    )
}

function FamilyHoliday() {
    return (
        <div className="relative rounded-xl overflow-hidden">
            <img className="w-full h-45 object-cover brightness-70"
                src="https://www.wheninmanila.com/wp-content/uploads/2023/06/Sheraton-Family-Escape-scaled.jpg" alt="a relaxation couple" />
            <div className="absolute inset-0 items-start py-4 px-5 text-white">
                <p className="pt-2 text-sm">Late escape deal</p>
                <p className="text-2xl font-bold py-1">Go for a good time, not a long time</p>
                <p className="pb-2">Squeeze out the last bit of sun with at least 15% off</p>
                <Link
                    href="/"
                    className="inline-flex rounded-lg border border-transparent bg-blue-400 px-5 py-3 text-sm
                     font-medium text-white hover:bg-blue-500"
                >
                    Find deals
                </Link>
            </div>
        </div>
    )
}


function CreditCardOffer() {
    return (
        <div className="relative rounded-xl overflow-hidden">
            <img className="w-full h-45 object-cover brightness-70"
                src="https://as2.ftcdn.net/v2/jpg/06/98/29/79/1000_F_698297926_B7IPHVLdKvZJPtXCxg5Jysv1JjjD9Zw8.jpg" alt="a relaxation couple" />
            <div className="absolute inset-0 items-start py-4 px-5 text-white">
                <p className="pt-2 text-sm">Late escape deal</p>
                <p className="text-2xl font-bold py-1">Go for a good time, not a long time</p>
                <p className="pb-2">Squeeze out the last bit of sun with at least 15% off</p>
                <Link
                    href="/"
                    className="inline-flex rounded-lg border border-transparent bg-blue-400 px-5 py-3 text-sm
                     font-medium text-white hover:bg-blue-500"
                >
                    Find deals
                </Link>
            </div>
        </div>
    )
}

function DisabledDiscount() {
    return (
        <div className="relative rounded-xl overflow-hidden">
            <Link href="/late_escape_deal" className="block">
                <img className="w-full h-45 object-cover brightness-70"
                    src="https://www.annieandre.com/wp-content/uploads/2019/07/Feat-reward-travel-credit-card-e1570200744269.jpg" alt="a relaxation couple" />
                <div className="absolute inset-0 items-start py-4 px-5 text-white">
                    <p className="pt-2 text-sm">Late escape deal</p>
                    <p className="text-2xl font-bold py-1">Go for a good time, not a long time</p>
                    <p className="pb-2">Squeeze out the last bit of sun with at least 15% off</p>
                    <Link
                        href="/"
                        className="inline-flex rounded-lg border border-transparent bg-blue-400 px-5 py-3 text-sm
                         font-medium text-white hover:bg-blue-500"
                    >
                        Find deals
                    </Link>
                </div>
            </Link>
        </div>
    )
}