export const switchPage = async (url : string) => {
        console.log("Đang xử lý đặt phòng...");
        window.location.href = `{${url}}`;
    }