"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ProductSlider from "@/components/ProductSlider";
import Footer from "@/components/Footer";

const governorates = [
  "عمان",
  "إربد",
  "الزرقاء",
  "العقبة",
  "المفرق",
  "جرش",
  "الكرك",
  "الطفيلة",
  "معان",
  "البلقاء",
  "مادبا",
];

const Awards = ["شاشه", "هاتف", "أي باد", "بلايستيشن"];

export default function Home() {
  const [step, setStep] = useState<"home" | "form">("home");
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // تشغيل الصوت عند تحميل الصفحة أو عند أول تفاعل
  useEffect(() => {
    const tryPlayAudio = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
      // إزالة مستمع التفاعل بعد أول نقرة
      window.removeEventListener("click", tryPlayAudio);
    };

    // محاولة التشغيل مباشرة
    tryPlayAudio();

    // إضافة مستمع لأي نقرة لتجاوز قيود المتصفح
    window.addEventListener("click", tryPlayAudio);

    return () => window.removeEventListener("click", tryPlayAudio);
  }, []);

  const handleGovernorateSelect = (gov: string) => {
    setSelectedGovernorate(gov);
    setStep("form");
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 relative">
      {/* sound */}
      <audio ref={audioRef} src="/sounds/backSound.mp3" loop />

      <Button
        onClick={toggleAudio}
        className="fixed top-4 right-4 bg-white text-red-500 hover:bg-red-100 z-50"
      >
        {isPlaying ? "إيقاف الصوت 🔊" : "تشغيل الصوت 🔈"}
      </Button>

      {/* home  */}
      {step === "home" && (
        <section className="flex flex-col items-center justify-center text-center px-4 py-20 text-white">
          <Image
            src="/images/logo.jpg"
            alt="Samaki Chips"
            width={200}
            height={200}
            priority
            className="rounded-full drop-shadow-xl"
          />

          <h1 className="text-4xl font-extrabold mt-6">اربح مع سمكي شيبس</h1>

          <p className="mt-4 max-w-md">
            نكهات لذيذة، جوائز قوية، وكود واحد ممكن يغيّر يومك
          </p>

          <ProductSlider />

          <h2 className="mt-8 mb-4 text-xl font-semibold">اختر محافظتك</h2>

          <div className="grid grid-cols-3 gap-4 max-w-md">
            {governorates.map((gov) => (
              <Button
                key={gov}
                onClick={() => handleGovernorateSelect(gov)}
                className="bg-white text-red-500 hover:bg-red-100"
              >
                📍 {gov}
              </Button>
            ))}
          </div>
        </section>
      )}

      {/*  FORM */}
      {step === "form" && (
        <section className="flex justify-center py-16 px-4">
          <Card className="w-full max-w-md shadow-lg">
            <CardContent className="space-y-3 pt-6">
              <h2 className="text-center font-bold text-xl">
                أدخل بياناتك ({selectedGovernorate})
              </h2>

              <Input placeholder="الاسم الرباعي" required />
              <Input placeholder="مكان السكن (المنطقة)" required />
              <Input type="tel" placeholder="رقم الهاتف" required />
              <Input placeholder="الرقم الوطني" required />

              <select className="w-full border rounded-md p-2" required>
                <option value="">اختر نوع الجائزة</option>
                {Awards.map((award) => (
                  <option key={award} value={award}>
                    {award}
                  </option>
                ))}
              </select>

              <Input
                placeholder="كود البطاقة (10 رموز)"
                maxLength={10}
                required
              />

              <p className="text-xs text-red-600">
                الكود صالح للاستخدام مرة واحدة فقط
              </p>

              <Button className="w-full">إرسال</Button>
            </CardContent>
          </Card>
        </section>
      )}

      <Footer />
    </main>
  );
}
