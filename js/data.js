/**
 * Hải Sản Giàu Mạnh (giaumanh.com)
 * Danh mục sản phẩm & Dữ liệu cấu hình giao hàng tại Phường Rạch Giá, An Giang
 */

const STORE_CONFIG = {
  name: "Hải Sản Giàu Mạnh",
  domain: "giaumanh.com",
  hotline: "0969.474.065",
  hotlineDisplay: "0969 474 065",
  zalo: "0969474065",
  momo: "0969474065",
  address: "72 đường Chu Văn An, Phường Rạch Giá, Tỉnh An Giang",
  boatArrivalMorning: "08:30",
  boatArrivalAfternoon: "14:30",
  freeShipThreshold: 300000,
  standardShipFee: 15000,
  expressShipFee: 25000,
  bankInfo: {
    bankId: "MB", // Ngân hàng Quân Đội MBBank
    accountNo: "0969474065",
    accountName: "Tran Thi Ngoc Giau"
  },
  momoInfo: {
    phone: "0969474065",
    name: "Tran Thi Ngoc Giau"
  }
};


const CATEGORIES = [
  { id: "all", name: "Tất Cả Sản Phẩm", icon: "✨" },
  { id: "muc", name: "Mực Ống Câu Tươi", icon: "🦑" },
  { id: "ca-tuoc", name: "Bạch Tuộc & Cá Biển", icon: "🐟" },
  { id: "kho", name: "Đặc Sản Khô Biển", icon: "☀️" },
  { id: "nong-san", name: "Vườn Quê Đồng Giá 10k", icon: "🌿" }
];

const PRODUCTS = [
  {
    id: "muc-cau-lon",
    name: "Mực Ống Câu Tươi VIP (Size Lớn)",
    category: "muc",
    price: 250000,
    originalPrice: 280000,
    unit: "1 kg",
    image: "images/muc-cau-lon.jpg",
    gallery: ["images/muc-cau-lon.jpg", "images/muc-ong-tuoi-1.jpg"],
    badge: "Ghe Câu VIP",
    badgeType: "hot",
    freshness: "Cập bến 8h30 sáng nay",
    origin: "Ghe câu cập bến trực tiếp chuyển về Rạch Giá",
    rating: 5.0,
    reviewsCount: 48,
    description: "Mực ống câu ghe lớn vừa cập bến 8h30 sáng, mực còn chớp nhấp nháy, thịt dày cùi ngọt lịm, chuẩn tươi sống 100%.",
    details: {
      size: "Khoảng 3 - 5 con / 1 kg",
      soChe: "Hỗ trợ rút túi mực, mổ làm sạch hoặc để nguyên con tùy ý",
      baoQuan: "Bảo quản ngăn đông lạnh hoặc thùng xốp ướp đá dùng ngay trong ngày",
      monNgon: ["Mực ống hấp gừng sả", "Mực nướng sa tế", "Mực dồn thịt sốt cà", "Mực xào chua ngọt"]
    },
    inStock: true
  },
  {
    id: "ca-bop-cat-lat",
    name: "Cá Bớp Biển Tươi Cắt Lát (Khoanh VIP)",
    category: "ca-tuoc",
    price: 280000,
    originalPrice: 310000,
    unit: "1 kg",
    image: "images/ca-bop-cat-lat.jpg",
    gallery: ["images/ca-bop-cat-lat.jpg"],
    badge: "Béo Ngon Số 1",
    badgeType: "hot",
    freshness: "Cắt khoanh tươi trong ngày",
    origin: "Cá bớp biển thiên nhiên tươi ngon",
    rating: 4.9,
    reviewsCount: 36,
    description: "Cá bớp biển thớ thịt trắng hồng tươi rói, da dày giòn sần sật, lớp mỡ béo ngậy tự nhiên không ngấy.",
    details: {
      size: "Cắt khoanh dày 2 - 3 cm theo yêu cầu",
      soChe: "Đã làm sạch vảy, cắt khúc đóng vỉ xốp hợp vệ sinh",
      baoQuan: "Ướp đá giao ngay hoặc bảo quản đông -18°C",
      monNgon: ["Lẩu cá bớp măng chua", "Cá bớp kho tộ tiêu xanh", "Cá bớp nấu ngót cà chua", "Cá bớp nướng muối ớt"]
    },
    inStock: true
  },
  {
    id: "bach-tuoc-gion",
    name: "Bạch Tuộc Giòn Tươi Sống (Tuộc Giòn)",
    category: "ca-tuoc",
    price: 180000,
    originalPrice: 200000,
    unit: "1 kg",
    image: "images/bach-tuoc-gion-1.jpg",
    gallery: ["images/bach-tuoc-gion-1.jpg", "images/bach-tuoc-hop.jpg"],
    badge: "Giòn Sần Sật",
    badgeType: "popular",
    freshness: "Vừa về chuyến tàu sáng",
    origin: "Đánh bắt tự nhiên trong ngày",
    rating: 4.9,
    reviewsCount: 29,
    description: "Tuộc giòn tươi trắng phao, râu giòn sần sật, vị ngọt đậm đà của biển cả. Thích hợp ăn lẩu và nướng.",
    details: {
      size: "Size vừa ăn, đều con",
      soChe: "Làm sạch răng, túi mắt, bóp muối sạch nhớt miễn phí",
      baoQuan: "Giao thùng đá ướp lạnh tận nơi",
      monNgon: ["Bạch tuộc nướng sa tế cay", "Bạch tuộc nhúng giấm cuốn bánh tráng", "Bạch tuộc xào rau củ", "Ăn lẩu Thái hải sản"]
    },
    inStock: true
  },
  {
    id: "muc-ong-nho",
    name: "Mực Ống Tươi Ghe Câu (Size Nhỡ)",
    category: "muc",
    price: 180000,
    originalPrice: 200000,
    unit: "1 kg",
    image: "images/muc-ong-tuoi-2.jpg",
    gallery: ["images/muc-ong-tuoi-2.jpg", "images/muc-ong-tuoi-1.jpg"],
    badge: "Món Cháy Hàng",
    badgeType: "popular",
    freshness: "Cập bến 8h30 sáng",
    origin: "Ghe câu cập bến trực tiếp",
    rating: 4.8,
    reviewsCount: 42,
    description: "Mực câu size vừa miệng, thịt giòn ngọt, vỏ mực ánh sao lấp lánh cực tươi ngon.",
    details: {
      size: "Khoảng 6 - 9 con / 1 kg",
      soChe: "Hỗ trợ làm sạch theo yêu cầu",
      baoQuan: "Đóng đá lạnh giao nhanh 30 phút",
      monNgon: ["Mực hấp hành gừng", "Mực chiên giòn chấm tương ớt", "Mực xào cần tỏi", "Mực nhúng mẻ"]
    },
    inStock: true
  },
  {
    id: "bach-tuoc-hop",
    name: "Bạch Tuộc Giòn Đóng Hộp Xốp Vệ Sinh",
    category: "ca-tuoc",
    price: 180000,
    originalPrice: 195000,
    unit: "1 hộp",
    image: "images/bach-tuoc-hop.jpg",
    gallery: ["images/bach-tuoc-hop.jpg"],
    badge: "Hộp Tiện Lợi",
    badgeType: "new",
    freshness: "Đóng hộp sáng nay",
    origin: "Sơ chế sạch sẽ tại bến",
    rating: 4.8,
    reviewsCount: 19,
    description: "Bạch tuộc giòn làm sạch sẵn, xếp gọn gàng trong hộp xốp ướp lạnh, mua về mở nắp chế biến ngay cực tiện.",
    details: {
      size: "Hộp đầy đặn chuẩn định lượng",
      soChe: "Đã bóp muối làm sạch nhớt 100%",
      baoQuan: "Bảo quản mát 0 - 4°C",
      monNgon: ["Nướng than hoa", "Lẩu kim chi hải sản", "Xào sa tế", "Hấp lá ổi chấm muối ớt"]
    },
    inStock: true
  },
  {
    id: "kho-ca-be",
    name: "Khô Cá Bè Dẻo Đặc Sản Biển 1 Nắng",
    category: "kho",
    price: 250000,
    originalPrice: 280000,
    unit: "1 kg",
    image: "images/kho-ca-be.jpg",
    gallery: ["images/kho-ca-be.jpg"],
    badge: "Đặc Sản Quà Biếu",
    badgeType: "special",
    freshness: "Phơi nắng tự nhiên dẻo thơm",
    origin: "Đặc sản biển Tây Nam",
    rating: 5.0,
    reviewsCount: 52,
    description: "Khô cá bè xẻ phơi nắng gió biển tự nhiên, thịt săn dẻo, thơm phức, ướp vừa miệng không mặn chát.",
    details: {
      size: "Cá lớn xẻ đôi dọc thân đều đẹp",
      soChe: "Hút chân không bảo quản sạch sẽ",
      baoQuan: "Để ngăn mát 6 tháng, ngăn đông 12 tháng",
      monNgon: ["Khô cá bè chiên giòn sốt giấm đường", "Nướng than hồng chấm mắm me", "Nấu canh chua bắp chuối", "Gỏi xoài khô cá bè"]
    },
    inStock: true
  },
  {
    id: "muc-ong-hop",
    name: "Mực Ống Tươi Đóng Hộp Giữ Nhiệt",
    category: "muc",
    price: 180000,
    originalPrice: 195000,
    unit: "1 hộp",
    image: "images/muc-ong-tuoi-3.jpg",
    gallery: ["images/muc-ong-tuoi-3.jpg"],
    badge: "Hộp Tươi Ướp Lạnh",
    badgeType: "new",
    freshness: "Vừa vô bến chuyển hộp",
    origin: "Ghe câu trong ngày",
    rating: 4.8,
    reviewsCount: 23,
    description: "Mực ống tươi mới vô sáng nay đóng hộp ngăn nắp, giữ trọn độ ẩm và vị ngọt tự nhiên của biển.",
    details: {
      size: "Đóng hộp tiêu chuẩn tiện lợi",
      soChe: "Làm sạch theo ghi chú của khách",
      baoQuan: "Ướp đá lạnh chuyển trong 30 phút",
      monNgon: ["Hấp bia sả ớt", "Mực rim me chua ngọt", "Mực nướng chao", "Canh chua mực lá giang"]
    },
    inStock: true
  },
  {
    id: "muc-ong-mini",
    name: "Mực Ống Tươi Ghe Câu (Size Nhỏ)",
    category: "muc",
    price: 150000,
    originalPrice: 170000,
    unit: "1 kg",
    image: "images/muc-ong-nhieu.jpg",
    gallery: ["images/muc-ong-nhieu.jpg"],
    badge: "Giá Cực Mềm",
    badgeType: "sale",
    freshness: "Mới vô sáng nay 150k",
    origin: "Ghe câu cập bến trực tiếp",
    rating: 4.7,
    reviewsCount: 31,
    description: "Mực câu ghe nhỏ tươi rói, giá siêu bình dân chỉ 150k/kg, thích hợp nấu canh, nấu mì, rim mặn ngọt đưa cơm.",
    details: {
      size: "Khoảng 12 - 16 con / 1 kg",
      soChe: "Hỗ trợ sơ chế nếu cần",
      baoQuan: "Thùng đá mát giao tận cửa",
      monNgon: ["Mực rim nước mắm tỏi ớt", "Mực xào dưa chua", "Nấu canh chua mực", "Mì hải sản mực tươi"]
    },
    inStock: true
  },
  {
    id: "oi-dong-moi-hai",
    name: "Ổi Sẻ Vườn Nhà Mới Hái (Đồng Giá 10k)",
    category: "nong-san",
    price: 10000,
    originalPrice: 20000,
    unit: "1 kg",
    image: "images/oi-dong-moi-hai.jpg",
    gallery: ["images/oi-dong-moi-hai.jpg"],
    badge: "Đồng Giá 10k/kg",
    badgeType: "sale",
    freshness: "Mới hái sáng nay tại vườn",
    origin: "Vườn quê nhà tại Rạch Giá, An Giang",
    rating: 4.9,
    reviewsCount: 64,
    description: "Ổi sẻ vườn nhà chín giòn rụm, ngọt thanh thơm mát, mới hái trên cây xuống còn nguyên cuống lá tươi.",
    details: {
      size: "Trái vừa ăn, giòn hạt mềm",
      soChe: "Hái tự nhiên, không ngâm thuốc kích thích",
      baoQuan: "Để nơi thoáng mát 3 - 5 ngày",
      monNgon: ["Ăn tươi chấm muối ớt Tây Ninh", "Làm nước ép ổi tươi", "Ổi lắc muối xí muội"]
    },
    inStock: true
  },
  {
    id: "coc-non-thau",
    name: "Cóc Non Vườn Quê / Cóc Bao Tử (Đồng Giá 10k)",
    category: "nong-san",
    price: 10000,
    originalPrice: 22000,
    unit: "1 kg",
    image: "images/coc-non-thau.jpg",
    gallery: ["images/coc-non-thau.jpg", "images/coc-rung-cay.jpg"],
    badge: "Đồng Giá 10k/kg",
    badgeType: "sale",
    freshness: "Mới hái trong ngày thau đầy",
    origin: "Cây nhà lá vườn sạch 100%",
    rating: 4.9,
    reviewsCount: 77,
    description: "Cóc non hạt lép giòn sần sật, chua thanh vừa phải không gắt, chấm muối ớt ăn vặt siêu cuốn miệng.",
    details: {
      size: "Cóc bao tử non mềm ăn được cả hột",
      soChe: "Hái trên cành còn tươi nguyên",
      baoQuan: "Để ngoài hoặc ngăn mát tủ lạnh ăn giòn rụm",
      monNgon: ["Cóc non dầm bò khô muối ớt", "Cóc non ngâm chua ngọt", "Ăn sống chấm mắm ruốc hoặc muối tôm"]
    },
    inStock: true
  },
  {
    id: "coc-dong-tui",
    name: "Cóc Đồng Đóng Túi Lưới (Đồng Giá 10k)",
    category: "nong-san",
    price: 10000,
    originalPrice: 20000,
    unit: "1 kg",
    image: "images/coc-dong-tui.jpg",
    gallery: ["images/coc-dong-tui.jpg"],
    badge: "Đồng Giá 10k/kg",
    badgeType: "sale",
    freshness: "Mới vô bao sáng nay",
    origin: "Vườn quê Rạch Giá",
    rating: 4.8,
    reviewsCount: 38,
    description: "Cóc đồng tươi vừa trẩy cây xong vô bao lưới thoáng khí, tươi nguyên, giá trợ giá chỉ 10.000đ/1kg.",
    details: {
      size: "Túi 1kg - 2kg tiện lợi",
      soChe: "Tự nhiên sạch từ vườn",
      baoQuan: "Bảo quản nơi khô ráo",
      monNgon: ["Lắc muối tôm cay", "Chấm mắm đường ớt xiêm", "Ngâm giấm đường"]
    },
    inStock: true
  },
  {
    id: "trung-ga-ta",
    name: "Trứng Gà Ta Thả Vườn Quê Sạch",
    category: "nong-san",
    price: 35000,
    originalPrice: 42000,
    unit: "1 chục (10 quả)",
    image: "images/trung-ga-ta.jpg",
    gallery: ["images/trung-ga-ta.jpg"],
    badge: "Gà Quê Thả Vườn",
    badgeType: "hot",
    freshness: "Mới lượm trong ngày",
    origin: "Trại vườn nhà quê An Giang",
    rating: 5.0,
    reviewsCount: 45,
    description: "Trứng gà ta thả vườn ăn bắp thóc, vỏ dày phấn tự nhiên, lòng đỏ to đậm màu và thơm béo giàu dinh dưỡng.",
    details: {
      size: "10 quả / vỉ hộp xốp sạch",
      soChe: "Lau sạch bụi bẩn tự nhiên",
      baoQuan: "Ngăn mát tủ lạnh dùng trong 30 ngày",
      monNgon: ["Trứng luộc lòng đào chấm muối tiêu", "Ốp la ăn kèm bánh mì", "Chiên thịt bằm", "Làm bánh flan siêu thơm"]
    },
    inStock: true
  }
];

const RACH_GIA_AREAS = [
  { id: "rg-central", name: "Khu vực 72 Chu Văn An & Trung tâm Phường Rạch Giá (Trần Phú, Nguyễn Trung Trực)", fee: 0, time: "10 - 20 phút", note: "Freeship đơn từ 200k" },
  { id: "rg-phucuong", name: "Khu Đô Thị Phú Cường & Bờ Kè Rạch Giá", fee: 10000, time: "20 - 30 phút", note: "Giao hỏa tốc ướp đá" },
  { id: "rg-taybac", name: "Khu Đô Thị Tây Bắc & Cảng Cá Rạch Giá", fee: 10000, time: "20 - 35 phút", note: "Gần bến tàu, giao cực nhanh" },
  { id: "rg-rachsoi", name: "Khu vực Rạch Sỏi - Chợ Nông Hải Sản", fee: 15000, time: "25 - 40 phút", note: "Freeship từ 300k" },
  { id: "rg-vinhlac", name: "Phường Vĩnh Lạc - Vĩnh Bảo lân cận", fee: 15000, time: "20 - 35 phút", note: "Giao tận nhà" },
  { id: "rg-vinhthong", name: "Phường Vĩnh Thông - Vĩnh Hiệp lân cận", fee: 20000, time: "30 - 45 phút", note: "Freeship từ 350k" },
  { id: "rg-other", name: "Các phường / xã khác thuộc tỉnh An Giang", fee: 25000, time: "45 - 60 phút", note: "Đóng thùng xốp đá giữ lạnh 12h" }
];

const REVIEWS = [
  {
    author: "Cô Ba Hồng",
    address: "KĐT Phú Cường, Rạch Giá",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    date: "Hôm qua lúc 09:15",
    content: "Mực ống câu 8h30 tàu vô là tầm 9h shop đã ship tới nhà liền. Mực còn chớp lấp lánh, hấp gừng ăn giòn ngọt xỉu luôn! Ổi sẻ 10k cũng rất giòn và ngọt.",
    item: "Mực Ống Câu VIP & Ổi Sẻ"
  },
  {
    author: "Anh Tuấn Minh",
    address: "Đường Nguyễn Trung Trực, Rạch Giá",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    date: "2 ngày trước",
    content: "Cá bớp cắt lát ở đây tươi ngon không chê vào đâu được, kho tộ thịt béo ngậy, nước sốt chấm rau thì hết sảy. Giá 280k/kg quá hời so với chất lượng.",
    item: "Cá Bớp Cắt Lát (Khoanh VIP)"
  },
  {
    author: "Chị Ngọc Mai",
    address: "Chợ Rạch Sỏi, Rạch Giá",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    date: "3 ngày trước",
    content: "Bạch tuộc nướng sa tế giòn sần sật, không hề bị teo nước như hàng chợ đông lạnh. Cóc non 10k chấm muối Tây Ninh chị em công ty mê tít!",
    item: "Bạch Tuộc Giòn & Cóc Non 10k"
  }
];
