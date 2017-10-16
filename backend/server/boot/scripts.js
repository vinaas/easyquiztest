module.exports = function (app) {
    var User = app.models.ApplicationUser;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    var Team = app.models.Team;
    User.create([
        { username: 'admin', email: 'admin@vinaas.com', password: '123' },
        { username: 'user', email: 'user@vinaas.com', password: '123' },
     ], function (err, users) {
        //create the admin role
        Role.create({
            name: 'admin'
        }, function (err, role) {
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id
            }, function (err, principal) {
            });
        });

        Role.create({
            name: 'user'
        }, function (err, role) {
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[1].id
            }, function (err, principal) {
            });
        });
    });


    // PhongBan.create([

    //     {
    //         "ten": "Phòng Hành chính nhân sự",
    //         "ma": "HAD",
    //         "truongPhongUserId": null,
    //     },
    //     {
    //         "ten": "Phòng Kinh doanh",
    //         "ma": "SCD",
    //         "truongPhongUserId": null,
    //     },
    //     {
    //         "ten": "Phòng Năng lượng",
    //         "ma": "EID",
    //         "truongPhongUserId": null,
    //     },
    //     {
    //         "ten": "Phòng Hàng hải - Tài sản - Kỹ thuật",
    //         "ma": "MTI",
    //         "truongPhongUserId": null,
    //     },
    //     {
    //         "ten": "Chi nhánh Miền Bắc",
    //         "ma": "NOB",
    //         "truongPhongUserId": null,
    //     },
    //     {
    //         "ten": "Chi nhánh Miền Trung",
    //         "ma": "CEB",
    //         "truongPhongUserId": null,
    //     },
    // ]);

    // NghiepVu.create([
    //     {
    //         "ten": "Dầu thô",
    //         "ma": "GDCL",
    //         "soChungThu": "11",
    //         "ngayTao": "2017-09-10T15:03:35.074Z",
    //         "trangThai": true,
    //         "phongBanId": 3,
    //     },
    //     {
    //         "ten": "Gas",
    //         "ma": "QDSL",
    //         "soChungThu": "14",
    //         "ngayTao": "2017-09-10T15:07:13.973Z",
    //         "trangThai": true,
    //         "phongBanId": 3,
    //     },
    //     {
    //         "ten": "Dau Khi",
    //         "ma": "QDSS",
    //         "soChungThu": "21",
    //         "ngayTao": "2017-09-25T15:18:42.987Z",
    //         "trangThai": true,
    //         "phongBanId": 3,
    //     },
    // ]);
    
    // KhachHang.create([
    //     {
    //         "ma": "C00001",
    //         "hoTen": "Phạm Thanh Tùng",
    //         "diaChi": "123 Gò Vấp - Tp. HCM",
    //         "email": "tung@mail.com",
    //         "fax": "0301430045AQWE",
    //         "soDienThoai": "0987654321",
    //         "soTaiKhoan": "ABCD-12345",
    //         "taiNganHang": "VCB",
    //         "maSoThue": "MST-1234",
    //         "soHopDong": "SHD-123",
    //         "ghiChu": "Khách hàng bình thường",
    //     },
    //     {
    //         "ma": "C00002",
    //         "hoTen": "Huỳnh Thanh Danh",
    //         "diaChi": "108 Cao Thắng, P4. Q3",
    //         "email": "danhth90@gmail.com",
    //         "fax": "097425635",
    //         "soDienThoai": "0974205615",
    //         "soTaiKhoan": "1253 3698 3695 1475",
    //         "taiNganHang": "BIDV",
    //         "maSoThue": "15792146",
    //         "soHopDong": "CFC002",
    //         "ghiChu": "Ghi Chú",
    //     },
    //     {
    //         "ma": "C00003",
    //         "hoTen": "Nguyễn Thị Hoài Thương",
    //         "diaChi": "25 Hòa Đồng, Ngọc Định, Đồng Nai",
    //         "email": "nththuong@gmail.com",
    //         "fax": "091209210923",
    //         "soDienThoai": "0980 192123",
    //         "soTaiKhoan": "0910 1238 1239 3910",
    //         "taiNganHang": "City Bank",
    //         "maSoThue": "102835913",
    //         "soHopDong": "CFC002",
    //         "ghiChu": "Ghi Chú",
    //     },
    //     {
    //         "ma": "C00003",
    //         "hoTen": "Nguyễn Trọng Hiếu",
    //         "diaChi": "25B, P. Tân Phú, TP HCM",
    //         "email": "nthieu@gmail.com",
    //         "fax": "0910129123",
    //         "soDienThoai": "0983109210",
    //         "soTaiKhoan": "0129 1210 2347 1998",
    //         "taiNganHang": "BIDV",
    //         "maSoThue": null,
    //         "soHopDong": null,
    //         "ghiChu": null,
    //     },
    //     {
    //         "ma": "C00004",
    //         "hoTen": "Nguyễn Thương Tín",
    //         "diaChi": null,
    //         "email": "nttin@gmail.com",
    //         "fax": null,
    //         "soDienThoai": null,
    //         "soTaiKhoan": null,
    //         "taiNganHang": null,
    //         "maSoThue": null,
    //         "soHopDong": null,
    //         "ghiChu": null,
    //     },
    //     {
    //         "ma": "C00005",
    //         "hoTen": "Trần Đại Nghĩa",
    //         "diaChi": "",
    //         "email": null,
    //         "fax": null,
    //         "soDienThoai": null,
    //         "soTaiKhoan": null,
    //         "taiNganHang": null,
    //         "maSoThue": null,
    //         "soHopDong": null,
    //         "ghiChu": null,
    //     },
    //     {
    //         "ma": "C00006",
    //         "hoTen": "Trương Nam Thành",
    //         "diaChi": null,
    //         "email": null,
    //         "fax": null,
    //         "soDienThoai": null,
    //         "soTaiKhoan": null,
    //         "taiNganHang": null,
    //         "maSoThue": null,
    //         "soHopDong": null,
    //         "ghiChu": null,
    //     },
    //     {
    //         "ma": "C00008",
    //         "hoTen": "Trương Thị Thâm",
    //         "diaChi": null,
    //         "email": null,
    //         "fax": null,
    //         "soDienThoai": null,
    //         "soTaiKhoan": null,
    //         "taiNganHang": null,
    //         "maSoThue": null,
    //         "soHopDong": null,
    //         "ghiChu": null,
    //     },
    //     {
    //         "ma": "C00009",
    //         "hoTen": "Tên Khách",
    //         "diaChi": null,
    //         "email": null,
    //         "fax": null,
    //         "soDienThoai": null,
    //         "soTaiKhoan": null,
    //         "taiNganHang": null,
    //         "maSoThue": null,
    //         "soHopDong": null,
    //         "ghiChu": null,
    //     },
    // ]);
};

