
let text_warn = document.getElementsByClassName('text-warn');
// -----------khach-hang------------

const khach_hang ={
    ten_kh : "",
    so_dt : "",
    kt_ten : function(){
        let hoten = document.getElementById('ho-ten');
        if(hoten.value==""){
            text_warn[0].style.color='red';
            hoten.placeholder='Vui lòng nhập đầy đủ họ tên';
            hoten.placeholder.color = 'red';
            hoten.style.borderColor='red';
            hoten.style.backgroundColor='#fba0a0';
            hoten.focus();
        }
        else{
            text_warn[0].style.color=text_warn[0].style.color=='red'?'red':'white';
            hoten.style.borderColor='black';
            hoten.style.backgroundColor='white';
            this.ten_kh = hoten.value;
        }
    },  

    kt_sdt : function(){
        let sdt = document.getElementById('so-dien-thoai');
        if(sdt.value==""){
            text_warn[0].style.color='red';
            sdt.placeholder='Vui lòng nhập số điện thoại';
            sdt.style.borderColor='red';
            sdt.style.backgroundColor='#fba0a0';
            sdt.focus();
        }
        else if(isNaN(sdt.value)){
            text_warn[0].style.color='red';
            sdt.value="";
            sdt.placeholder='Số điện thoại không hợp lệ';
            sdt.style.borderColor='red';
            sdt.style.backgroundColor='#fba0a0';
            sdt.focus();
        }
        else{
            text_warn[0].style.color='white';
            sdt.style.borderColor='black';
            sdt.style.backgroundColor='white';
            this.so_dt = sdt.value;
        }
    }
}

// -----------dich-vu------------

var time_btn =document.getElementsByClassName('time-btn');
var lich = document.getElementById('date-box');
var temp;

const dich_vu={

    kt_chi_nhanh:function(){
        let count =0;
        let chi_nhanh =document.querySelectorAll('input[name="br"]');
        for(let cn of chi_nhanh){
            if(cn.checked==false){
                count++;
            }
        }
        if(count != 4){
            text_warn[1].style.color='white';
        }
        else {
            text_warn[1].style.color='red';
            chi_nhanh[0].focus();
        }
    },

    khung_gio:function(){
        // chon-khung-gio
        let count = 1;
        for(let tb of time_btn){
            tb.addEventListener('click',()=>
            {
                if(count!=1){
                    temp.style.borderStyle = 'none';
                    temp.style.backgroundColor='white';
                    count=1;
                }
                tb.style.borderStyle = 'dashed';
                tb.style.backgroundColor='rgb(213, 207, 207)';
                count++;
                temp = tb;
            }
        )}
    },
    kt_ngay_dl:function(){
        let lich= document.getElementById('date-box');
        if(lich.value==""){
            lich.focus();
            text_warn[2].style.color = 'red';
        }
        else{
            text_warn[2].style.color = 'white';
        }
    },

    kt_khung_gio: function(){
        if(typeof temp == 'undefined'){
            text_warn[3].style.color='red';
            time_btn[0].focus();
        }
        else{
            text_warn[3].style.color='white';
        }
    },


    ngay_dl:function(){
        let date = new Date();
        let ngay = date.getDate();
        let thang = date.getMonth();
        let nam = date.getFullYear();
        let hours = date.getHours()

        var ngay_1 = nam+"-"+(thang + 1)+"-"+ngay;
        var ngay_2 = nam+"-"+(thang + 1)+"-"+(ngay+1);
        var ngay_3 = nam+"-"+(thang + 1)+"-"+(ngay+2);
        lich.setAttribute('min' , ngay_1);
        lich.setAttribute('max' , ngay_3);

        //khoa khung gio
        lich.addEventListener('change', function(){
            console.log(lich.value)
        let lich_value_temp = lich.value;
            for(let tb of time_btn){
                let time = Number(tb.value);
                if(String(lich_value_temp) != String(ngay_1) && String(lich_value_temp) != String(ngay_2) && String(lich_value_temp) != String(ngay_3)){
                    tb.disabled = true;
                    tb.hover = 'none'
                    tb.style.opacity = '0.5';
                }
                else if(time <= hours && String(lich_value_temp) == String(ngay_1)){
                    tb.disabled = true;
                    tb.hover = 'none'
                    tb.style.opacity = '0.5';
                }
                else{
                    tb.disabled = false;
                    tb.style.opacity = '1';
                }
            }
        })
    }
}
dich_vu.ngay_dl();
dich_vu.khung_gio();

function kiem_tra(){
    dich_vu.kt_ngay_dl();
    dich_vu.kt_khung_gio();
    dich_vu.kt_chi_nhanh();
    khach_hang.kt_sdt();
    khach_hang.kt_ten();
}