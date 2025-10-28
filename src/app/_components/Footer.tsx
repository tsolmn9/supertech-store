import {
  Facebook,
  Instagram,
  Locate,
  LocateIcon,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export const Footer = () => {
  return (
    <div className="w-screen flex gap-6 bg-black text-white p-6">
      <div className="w-2/6 pl-20 h-3">
        <img src={"/logo.png"} width={200} height={50} />
      </div>
      <div className="flex flex-col gap-4 w-1/6">
        <div className="text-lg font-bold font-sans">Бидний тухай</div>
        <div className="flex flex-col gap-1">
          <div>Бүтээгдэхүүн үйлчилгээ</div>
          <div>Бидний тухай</div>
          <div>Шуурхай хүргэлт</div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-1/6">
        <div className="text-lg font-bold font-sans">Тусламж</div>
        <div className="flex flex-col gap-1">
          <div>Санал хүсэлт</div>
          <div>Мэдээ мэдээлэл</div>
          <div>Цагийн хуваарь</div>
          <div>Заавар зөвлөгөө</div>
          <div>Үйлчилгээний нөхцөл</div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-1/6">
        <div className="text-lg font-bold font-sans">Биднийг дагаарай</div>
        <div className="flex gap-2">
          <Instagram />
          <Facebook />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-1/6">
        <div className="text-lg font-bold font-sans">Холбоо барих</div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Phone />
            <div>96666694</div>
          </div>
          <div className="flex gap-2">
            <Mail />
            <div>Turiinhash@gmail.com</div>
          </div>
          <div className="flex gap-2">
            <MapPin />
            <div>Хаяг байршил</div>
          </div>
        </div>
      </div>
    </div>
  );
};
