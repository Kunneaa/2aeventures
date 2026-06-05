"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Handshake, ShieldCheck, Truck, Users } from "lucide-react";
import { useLanguage } from "../../../store/LanguageContext";

const images = {
  hero: "/images/1.jpg",
  sourcing:
    "https://images.unsplash.com/photo-1733809708507-e9f9c2b7bc53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920",
  logistics:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
  products:
    "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1600&q=80",
};

const aboutContent = {
  vi: {
    heroKicker: "Phân phối, bán lẻ, nhập khẩu & xuất khẩu thực phẩm",
    heroTitle: "Kết nối nguồn hàng quốc tế với thị trường Việt Nam.",
    heroText:
      "2AE xây dựng một hệ thống phân phối thực phẩm chuyên nghiệp, đáng tin cậy và hiệu quả tại Việt Nam, tập trung vào sản phẩm an toàn, chất lượng và có nguồn gốc rõ ràng.",
    heroNote:
      "Thế mạnh của 2AE đến từ khả năng tiếp cận nguồn hàng chất lượng từ Mỹ, Úc và các đối tác nước ngoài uy tín khác.",
    heroMarks: ["Phân phối", "Bán lẻ", "Nhập khẩu", "Xuất khẩu"],
    whoTitle: "Who We Are",
    whoIntro:
      "2AE được xây dựng từ kinh nghiệm thực tế trong ngành thực phẩm và góc nhìn vận hành của thị trường quốc tế.",
    whoPoints: [
      {
        title: "Nền tảng ngành thực phẩm",
        text: "Kinh nghiệm trong xuất khẩu, nhập khẩu, phân phối và bán lẻ giúp 2AE hiểu rõ vai trò của chất lượng sản phẩm, nguồn gốc minh bạch, tiêu chuẩn vận hành và sự ổn định trong chuỗi cung ứng.",
      },
      {
        title: "Nguồn hàng quốc tế",
        text: "2AE kết nối với các nguồn hàng chất lượng từ nước ngoài, đặc biệt là những thị trường có tiêu chuẩn cao như Mỹ, Úc, để lựa chọn sản phẩm phù hợp với nhu cầu Việt Nam.",
      },
      {
        title: "Hệ thống phân phối có chọn lọc",
        text: "2AE không chỉ tập trung vào sản phẩm, mà còn xây dựng mạng lưới kết nối giữa nhà cung cấp quốc tế, logistics, nhà phân phối, bán lẻ và người tiêu dùng.",
      },
      {
        title: "Góc nhìn xuất khẩu",
        text: "Hoạt động hợp tác quốc tế trong xuất khẩu thực phẩm giúp 2AE hiểu sâu hơn về tiêu chuẩn sản phẩm, nhu cầu thị trường và cách vận hành của ngành thực phẩm hiện đại.",
      },
    ],
    flowTitle: "Chuỗi kết nối 2AE hướng đến",
    flow: ["Nguồn hàng quốc tế", "Logistics", "Phân phối", "Bán lẻ", "Người tiêu dùng"],
    storyTitle: "Our Story",
    storyLead:
      "Hành trình của 2AE bắt đầu từ kinh nghiệm thực tế và lợi thế tiếp cận các nguồn hàng chất lượng từ thị trường quốc tế.",
    storySteps: [
      {
        title: "Khởi đầu từ nguồn hàng chất lượng",
        text: "2AE bắt đầu từ khả năng tiếp cận các nguồn hàng từ những quốc gia có tiêu chuẩn cao như Mỹ, Úc và các đối tác nước ngoài uy tín.",
      },
      {
        title: "Nhận diện nhu cầu tại Việt Nam",
        text: "Thị trường Việt Nam ngày càng cần các sản phẩm thực phẩm an toàn, chất lượng và có nguồn gốc rõ ràng.",
      },
      {
        title: "Xây dựng hệ thống vận hành",
        text: "Một sản phẩm tốt cần hệ thống phân phối chuyên nghiệp, ổn định và đáng tin cậy để đến tay khách hàng hiệu quả.",
      },
      {
        title: "Mở rộng hợp tác bền vững",
        text: "2AE tiếp tục phát triển mạng lưới trong và ngoài nước để đưa sản phẩm quốc tế chất lượng đến gần hơn với khách hàng Việt Nam.",
      },
    ],
  },
  en: {
    heroKicker: "Food distribution, retail, import & export",
    heroTitle: "Connecting international food sources with the Vietnamese market.",
    heroText:
      "2AE is building a professional, reliable, and efficient food distribution system in Vietnam, focusing on safe, high-quality products with clear origin.",
    heroNote:
      "2AE's strength comes from access to quality sources from the United States, Australia, and other trusted overseas partners.",
    heroMarks: ["Distribution", "Retail", "Import", "Export"],
    whoTitle: "Who We Are",
    whoIntro:
      "2AE is built on practical food industry experience and an operating perspective shaped by international markets.",
    whoPoints: [
      {
        title: "Food industry foundation",
        text: "Experience in export, import, distribution, and retail helps 2AE understand product quality, transparent origin, professional standards, and supply chain stability.",
      },
      {
        title: "International sourcing",
        text: "2AE connects with quality overseas sources, especially high-standard markets such as the United States and Australia, to select products suited to Vietnam.",
      },
      {
        title: "Selective distribution system",
        text: "Beyond products, 2AE builds connections among international suppliers, logistics partners, distributors, retailers, and consumers.",
      },
      {
        title: "Export perspective",
        text: "International cooperation in food export gives 2AE deeper understanding of product standards, market needs, and modern food operations.",
      },
    ],
    flowTitle: "The connection chain 2AE is building",
    flow: ["International sources", "Logistics", "Distribution", "Retail", "Consumers"],
    storyTitle: "Our Story",
    storyLead:
      "2AE's journey began with practical experience and the advantage of accessing quality sources from international markets.",
    storySteps: [
      {
        title: "Starting from quality sources",
        text: "2AE began with access to sources from high-standard countries such as the United States, Australia, and trusted overseas partners.",
      },
      {
        title: "Reading Vietnam's demand",
        text: "The Vietnamese market increasingly needs safe, high-quality food products with clear origin.",
      },
      {
        title: "Building the operating system",
        text: "A good product needs a professional, stable, and reliable distribution system to reach customers effectively.",
      },
      {
        title: "Expanding sustainable partnerships",
        text: "2AE continues to develop domestic and international networks to bring quality international products closer to Vietnamese customers.",
      },
    ],
  },
};

const iconStyles = [
  { icon: ShieldCheck, className: "text-[#2f6f63]" },
  { icon: Truck, className: "text-[#336699]" },
  { icon: Handshake, className: "text-[#b87333]" },
  { icon: Users, className: "text-[#17324d]" },
];

export default function AboutPage() {
  const { language } = useLanguage();
  const content = aboutContent[language];

  return (
    <div className="app-shell w-full">
      <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#0b151c]">
        <Image
          src={images.hero}
          alt="2AE Ventures"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,15,22,0.92),rgba(7,15,22,0.72)_42%,rgba(7,15,22,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b151c] to-transparent" />

        <div className="section-shell relative flex min-h-[calc(100vh-4rem)] flex-col justify-end pb-8 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl pb-12 md:pb-20"
          >
            <p className="eyebrow-on-dark mb-5">
              {content.heroKicker}
            </p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
              {content.heroTitle}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
              {content.heroText}
            </p>
            <p className="mt-5 max-w-2xl border-l-2 border-[#d9a85c] pl-5 text-base leading-relaxed text-white/80 md:text-lg">
              {content.heroNote}
            </p>
          </motion.div>

          <div className="grid border-t border-white/20 md:grid-cols-4">
            {content.heroMarks.map((item) => (
              <div
                key={item}
                className="border-b border-white/10 py-4 text-sm font-bold uppercase text-white/80 md:border-b-0 md:border-r md:border-white/10"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="section-shell grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-24">
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase text-[#2f6f63]">
                01 <ArrowUpRight className="h-4 w-4" />
              </p>
              <h2 className="text-3xl font-extrabold leading-tight text-[#17324d] md:text-5xl">
                {content.whoTitle}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[#5c6a72] md:text-lg">
                {content.whoIntro}
              </p>
              <div className="relative mt-9 aspect-[4/3] overflow-hidden rounded-lg bg-[#eef4f2]">
                <Image
                  src={images.logistics}
                  alt="Food logistics and distribution"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="border-y border-[#d8e3df]">
              {content.whoPoints.map((point, index) => {
                const style = iconStyles[index];
                const Icon = style.icon;

                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className="grid gap-5 border-b border-[#d8e3df] py-7 last:border-b-0 md:grid-cols-[84px_1fr]"
                  >
                    <div className="flex items-center gap-3 md:block">
                      <span className="block text-sm font-bold text-[#9aa9a4]">
                        0{index + 1}
                      </span>
                      <Icon className={`mt-0 h-7 w-7 md:mt-5 ${style.className}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-[#17242d] md:text-2xl">
                        {point.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-[#53636c]">
                        {point.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="mt-12 border-y border-[#d8e3df] py-8"
            >
              <h3 className="mb-6 text-lg font-extrabold text-[#17324d]">
                {content.flowTitle}
              </h3>
              <div className="grid gap-4 md:grid-cols-5">
                {content.flow.map((item, index) => (
                  <div key={item} className="flex items-center gap-3 md:block">
                    <div className="flex min-h-12 items-center justify-between border-l-2 border-[#d9a85c] pl-4 md:border-l-0 md:border-t-2 md:pl-0 md:pt-4">
                      <span className="text-sm font-bold text-[#17242d]">{item}</span>
                      {index < content.flow.length - 1 && (
                        <ArrowRight className="hidden h-4 w-4 text-[#b87333] md:block" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7f5]">
        <div className="section-shell grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-24">
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase text-[#b87333]">
                02 <ArrowUpRight className="h-4 w-4" />
              </p>
              <h2 className="text-3xl font-extrabold leading-tight text-[#17324d] md:text-5xl">
                {content.storyTitle}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#5c6a72] md:text-lg">
                {content.storyLead}
              </p>
              <div className="relative mt-9 aspect-[5/4] overflow-hidden rounded-lg bg-white">
                <Image
                  src={images.products}
                  alt="Quality food products"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 34vw"
                />
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-8">
            <div className="relative">
              <div className="absolute left-[23px] top-2 hidden h-[calc(100%-1rem)] w-px bg-[#c7d8d1] md:block" />
              <div className="space-y-8">
                {content.storySteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: index * 0.06 }}
                    className="relative grid gap-5 md:grid-cols-[48px_1fr]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#b8cbc4] bg-[#f4f7f5] text-sm font-extrabold text-[#2f6f63]">
                      {index + 1}
                    </div>
                    <div className="commerce-card p-6">
                      <h3 className="text-xl font-extrabold text-[#17242d] md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-[#53636c]">
                        {step.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="mt-12 overflow-hidden rounded-lg bg-[#17324d] text-white"
            >
              <div className="grid gap-0 md:grid-cols-[1fr_280px]">
                <div className="p-7 md:p-9">
                  <p className="eyebrow-on-dark">
                    2AE Ventures
                  </p>
                  <p className="mt-4 text-2xl font-extrabold leading-snug md:text-3xl">
                    {language === "vi"
                      ? "Một hệ thống phân phối thực phẩm chuyên nghiệp, bền vững và đáng tin cậy."
                      : "A professional, sustainable, and reliable food distribution system."}
                  </p>
                </div>
                <div className="relative min-h-[220px]">
                  <Image
                    src={images.sourcing}
                    alt="International food sourcing"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
