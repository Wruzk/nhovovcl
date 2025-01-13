// Hello C++
#include <iostream>
#include <string>
using namespace std;

struct SinhVien
{
    int can_nang;
    float chieucao;
    string ten;
};

string chi_so_bmi(SinhVien nguoi)
{
    float bmi = nguoi.can_nang / (nguoi.chieucao * nguoi.chieucao);
    string ket_qua;
    if (bmi < 18)
    {
        ket_qua = "gay vl";
    }
    else if (bmi > 25)
    {
        ket_qua = "bung bu lo xo be";
    }
    else
    {
        ket_qua = "depzai co nhieu dua yeu ^_^";
    }
    // std :: cout << "Chi so BMI cua ban " << nguoi.ten << " " << "la " << ket_qua << std :: endl;
    return ket_qua;
}

void dong_thoi_gian(SinhVien nguoi, int nam_troi_qua)
{
    for (int i = 0; i < nam_troi_qua; i++)
    {
        nguoi.can_nang = nguoi.can_nang + 2;
    }
    string ket_qua = chi_so_bmi(nguoi);
    cout << "Ban " << nguoi.ten << " sau " << nam_troi_qua << " nam troi qua se " << ket_qua << std ::endl;
}

int main() {
    int nam_troi_qua;
    SinhVien nguoi;
    cout << "Nhap ten cua ban: ";
    getline(cin, nguoi.ten); 
    cout << "Nhap can nang cua ban (kg): ";
    cin >> nguoi.can_nang;
    cout << "Nhap chieu cao cua ban (m): ";
    cin >> nguoi.chieucao;
    cout << "Ban muon tinh chi so BMI sau bao nhieu nam: ";
    cin >> nam_troi_qua;

    dong_thoi_gian(nguoi, nam_troi_qua);

    SinhVien* pointer = &nguoi;
    cout << "Dia chi con tro: " << pointer << endl;

    return 0;
}