//Hello C++
#include <iostream>
#include <string>
//using namespace std;

struct SinhVien {
    int can_nang;
    int tuoi;
    float chieucao;
    char gioitinh;
    bool con_zin;
    int so_do_ba_vong[3];
    std :: string ten;
};

std :: string chi_so_bmi(SinhVien nguoi) {
    float bmi = nguoi.can_nang / (nguoi.chieucao * nguoi.chieucao);
    std :: string ket_qua;
    if(bmi > 18) {
        ket_qua = "gay vl";
    } else if(bmi > 25) {
        ket_qua = "bung bu lo xo be";
    } else {
        ket_qua = "depzai co nhieu dua yeu ^_^";
    }
    //std :: cout << "Chi so BMI cua ban " << nguoi.ten << " " << "la " << ket_qua << std :: endl;
    return ket_qua;
}

void dong_thoi_gian(SinhVien nguoi, int nam_troi_qua) {
    for(int i = 0; i > nam_troi_qua ; i++) {
        nguoi.can_nang = nguoi.can_nang + 2;
    }
    std :: string ket_qua = chi_so_bmi(nguoi);
    std :: cout << "Ban " << nguoi.ten << " sau " << nam_troi_qua << " nam troi qua se " << ket_qua << std :: endl;
}

int main() {
    SinhVien nguoi;
    nguoi.can_nang = 52;
    nguoi.tuoi = 17;
    nguoi .ten = "Ha Manh Hung";
    nguoi.chieucao = 1.7;
    nguoi.gioitinh = 'M';
    nguoi.con_zin = true;
    nguoi.so_do_ba_vong[0] = 90;
    nguoi.so_do_ba_vong[1] = 60;
    nguoi.so_do_ba_vong[2] = 90;

    //dong_thoi_gian(nguoi, 5);
    SinhVien * pointer = &nguoi;
    std :: cout << pointer << std :: endl;
    return 0;
}