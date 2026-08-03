"use client";

import { useMemo, useRef, useState } from "react";

const techniques = [
  { id: 1, title: "Проход в одну ногу", category: "Броски", duration: "12 мин", level: "Базовый", image: "/images/technique-video.jpg", video: "/videos/tech-single-leg.mp4" },
  { id: 2, title: "Бросок через бедро", category: "Броски", duration: "18 мин", level: "Средний", image: "/images/action-throw.jpg", video: "/videos/tech-hip-throw.mp4" },
  { id: 3, title: "Удержание сбоку", category: "Партер", duration: "9 мин", level: "Базовый", image: "/images/hero-wrestler.jpg", video: "/videos/tech-side-control.mp4" },
  { id: 4, title: "Мельница", category: "Броски", duration: "22 мин", level: "Продвинутый", image: "/images/action-throw.jpg", video: "/videos/tech-fireman.mp4" },
  { id: 5, title: "Уход от захвата корпуса", category: "Защита", duration: "8 мин", level: "Средний", image: "/images/technique-video.jpg", video: "/videos/tech-escape.mp4" },
  { id: 6, title: "Забегание в партере", category: "Партер", duration: "14 мин", level: "Базовый", image: "/images/hero-wrestler.jpg", video: "/videos/tech-turnover.mp4" },
];

const steps = [
  { n: 1, title: "Стойка и дистанция", note: "Центр тяжести, положение головы" },
  { n: 2, title: "Проход в ногу", note: "Уровень, шаг проникновения" },
  { n: 3, title: "Захват и рычаг", note: "Замок рук за коленом" },
  { n: 4, title: "Завершение броска", note: "Протяжка и контроль в партере" },
];

const styles = [
  { name: "Вольная", text: "Атака ног, свобода захватов, темп" },
  { name: "Греко-Римская", text: "Только верх, борьба в стойке, мощь" },
  { name: "Самбо", text: "Броски и болевые, куртка-самбовка" },
  { name: "Дзюдо", text: "Броски через кимоно, удержания" },
];

const champions = ["АЛЕКСАНДР КАРЕЛИН", "БУВАЙСАР САЙТИЕВ", "АРСЕН ФАДЗАЕВ", "ХАДЖИМУРАД МАГОМЕДОВ", "МАВЛЕТ БАТИРОВ", "АБДУЛРАШИД САДУЛАЕВ", "ХАБИБ НУРМАГОМЕДОВ", "ИВАН ЯРЫГИН"];

type VideoModal = { title: string; src: string } | null;
type Exercise = "idle" | "pushup" | "pullup";

export default function Home() {
  const [activeStep, setActiveStep] = useState(1);
  const [category, setCategory] = useState("Все");
  const [video, setVideo] = useState<VideoModal>(null);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [exercise, setExercise] = useState<Exercise>("idle");
  const [pushups, setPushups] = useState(0);
  const [pullups, setPullups] = useState(0);
  const trainingVideo = useRef<HTMLVideoElement>(null);

  const filteredTechniques = useMemo(
    () => category === "Все" ? techniques : techniques.filter((item) => item.category === category),
    [category],
  );

  const openVideo = (title: string, src: string) => setVideo({ title, src });
  const currentStep = steps[activeStep - 1];

  const playExercise = (next: Exclude<Exercise, "idle">) => {
    setExercise(next);
    if (next === "pushup") setPushups((value) => value + 1);
    if (next === "pullup") setPullups((value) => value + 1);
    const player = trainingVideo.current;
    if (player) {
      player.currentTime = 0;
      void player.play();
    }
  };

  const resetTraining = () => {
    setExercise("idle");
    setPushups(0);
    setPullups(0);
  };

  return (
    <main className="min-h-screen bg-mat-black text-white font-sans selection:bg-mat-red">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-mat-black/80 backdrop-blur-md">
        <a href="#top" className="text-2xl font-display tracking-tighter uppercase italic">ЗАХВАТ</a>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
          <a href="#techniques" className="hover:text-mat-red transition-colors">Приёмы</a>
          <a href="#academy" className="hover:text-mat-red transition-colors">Тренировка</a>
          <a href="#styles" className="hover:text-mat-red transition-colors">Стили</a>
          <a href="#coach" className="hover:text-mat-red transition-colors">Тренер</a>
        </div>
        <button onClick={() => openVideo("Схватка на ковре", "/videos/wrestling-match.mp4")} className="bg-white text-mat-black px-5 py-2 text-xs font-black uppercase tracking-tight hover:bg-mat-red hover:text-white transition-colors">Выйти на ковёр</button>
      </nav>

      <section id="top" className="relative px-6 pt-16 pb-28 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-mat-red/25 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-mat-blue/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative">
          <div>
            <span className="inline-block px-3 py-1 bg-mat-red text-[10px] font-bold uppercase tracking-widest mb-6">Школа Борьбы · Онлайн</span>
            <h1 className="font-display text-6xl md:text-8xl uppercase leading-[0.85] mb-8">Овладей <br /><span className="text-stroke-white">Броском</span></h1>
            <p className="text-white/60 max-w-md text-lg leading-relaxed mb-8">Тренируйся с мастерами спорта. Смотри как тренер выполняет приём, повторяй за ним движение, доводи технику до автоматизма через систему теневой тренировки.</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setTrainingOpen(true)} className="bg-mat-red px-8 py-4 font-display text-xl uppercase tracking-wide hover:scale-105 transition-transform">Начать тренировку</button>
              <a href="#techniques" className="border border-white/20 px-8 py-4 font-display text-xl uppercase tracking-wide hover:bg-white hover:text-mat-black transition-colors">Библиотека приёмов</a>
            </div>
          </div>
          <div className="relative">
            <img src="/images/hero-wrestler.jpg" alt="Борец на ковре в тренировочном зале" width="1024" height="1280" className="w-full aspect-[4/5] object-cover outline-1 -outline-offset-1 outline-white/10 shadow-2xl" />
            <div className="absolute -bottom-6 -left-6 bg-mat-blue p-6 shadow-xl"><div className="text-4xl font-display italic">120+</div><div className="text-[10px] uppercase font-bold tracking-tighter">Разобранных приёмов</div></div>
            <div className="absolute -top-4 right-4 bg-mat-black border border-white/20 px-4 py-2"><div className="text-[10px] uppercase font-bold tracking-widest text-white/50">Главный тренер</div><div className="text-sm font-bold">Александр Волков · МСМК</div></div>
          </div>
        </div>
      </section>

      <section id="academy" className="bg-white text-mat-black py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="font-display text-5xl md:text-6xl uppercase leading-none">Тренер показал —<br />ты повторил</h2>
            <p className="max-w-xs text-sm font-bold uppercase text-mat-black/50">Смотри как выполняет мастер. Включай камеру и отрабатывай движение синхронно с тренером.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <button onClick={() => openVideo(`Фаза ${activeStep}: ${currentStep.title}`, "/videos/technique-demo.mp4")} className="relative group cursor-pointer w-full text-left">
                <img src="/images/technique-video.jpg" alt="Разбор техники: проход в одну ногу" width="1280" height="736" className="w-full aspect-video object-cover outline-1 -outline-offset-1 outline-black/10" />
                <span className="absolute inset-0 flex items-center justify-center bg-mat-black/30 group-hover:bg-mat-black/50 transition-colors"><span className="w-20 h-20 bg-mat-red flex items-center justify-center rounded-full shadow-2xl group-hover:scale-110 transition-transform"><span className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1.5" /></span></span>
                <span className="absolute top-4 left-4 bg-mat-red px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">Урок 04 · Демонстрация</span>
              </button>
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div><h3 className="font-display text-2xl uppercase">Фаза {activeStep}: {currentStep.title}</h3><p className="text-sm text-mat-black/60">{currentStep.note}</p></div>
                <div className="flex gap-2"><span className="px-3 py-1 bg-mat-black text-white text-[10px] font-bold">ПОВТОРЫ: 0/10</span><span className="px-3 py-1 bg-mat-blue text-white text-[10px] font-bold uppercase">Зеркало · Вкл.</span></div>
              </div>
            </div>
            <div className="space-y-3">
              {steps.map((step) => {
                const active = step.n === activeStep;
                return <button key={step.n} onClick={() => setActiveStep(step.n)} className={`w-full text-left p-4 border-l-4 transition-all ${active ? "border-mat-red bg-stone-50" : "border-transparent hover:bg-stone-50 opacity-50 hover:opacity-100"}`}><div className={`text-[10px] font-bold mb-1 ${active ? "text-mat-red" : "text-mat-black/40"}`}>{active ? "ТЕКУЩИЙ ШАГ" : `ШАГ ${step.n}`}</div><div className="font-bold text-sm uppercase">{step.n}. {step.title}</div></button>;
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="techniques" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="font-display text-5xl md:text-6xl uppercase leading-none">Библиотека<br />приёмов</h2>
            <div className="flex gap-2 flex-wrap">{["Все", "Броски", "Партер", "Защита"].map((item) => <button key={item} onClick={() => setCategory(item)} className={`px-4 py-2 text-xs font-black uppercase tracking-widest border transition-colors ${category === item ? "bg-mat-red border-mat-red text-white" : "border-white/20 text-white/60 hover:border-white hover:text-white"}`}>{item}</button>)}</div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTechniques.map((item) => <article key={item.id} onClick={() => openVideo(item.title, item.video)} className="group bg-mat-gray border border-white/5 hover:border-mat-red transition-colors cursor-pointer"><div className="relative aspect-[4/3] overflow-hidden"><img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" /><div className="absolute top-3 left-3 bg-mat-black/80 px-2 py-1 text-[10px] font-bold uppercase tracking-widest">{item.duration}</div><div className="absolute bottom-3 right-3 bg-mat-red px-2 py-1 text-[10px] font-black uppercase">{item.level}</div></div><div className="p-5"><div className="text-[10px] font-bold uppercase tracking-widest text-mat-red mb-2">{item.category}</div><h3 className="font-display text-2xl uppercase leading-tight mb-3">{item.title}</h3><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white">Смотреть разбор <span className="transition-transform group-hover:translate-x-1">→</span></div></div></article>)}
          </div>
        </div>
      </section>

      <section id="styles" className="bg-mat-gray py-24 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto"><div className="mb-12"><span className="text-[10px] font-bold uppercase tracking-widest text-mat-red">Направления</span><h2 className="font-display text-5xl md:text-6xl uppercase leading-none mt-2">Четыре стиля<br />одна школа</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">{styles.map((item, index) => <div key={item.name} className="bg-mat-gray p-8 hover:bg-mat-black transition-colors group"><div className="font-display italic text-6xl text-mat-red/30 group-hover:text-mat-red transition-colors mb-6">0{index + 1}</div><h3 className="font-display text-3xl uppercase mb-3">{item.name}</h3><p className="text-sm text-white/60 leading-relaxed">{item.text}</p></div>)}</div></div>
      </section>

      <section id="coach" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative"><img src="/images/action-throw.jpg" alt="Александр Волков — тренер, выполняет бросок" className="w-full aspect-square object-cover" /><div className="absolute -bottom-4 -right-4 bg-mat-red p-5"><div className="font-display text-2xl italic">20 лет</div><div className="text-[10px] uppercase font-bold">на ковре</div></div></div>
          <div><span className="text-[10px] font-bold uppercase tracking-widest text-mat-red">Твой тренер</span><h2 className="font-display text-5xl md:text-6xl uppercase leading-none mt-2 mb-8">Александр<br />Волков</h2><div className="space-y-4 text-white/70 leading-relaxed mb-10"><p>Мастер спорта международного класса по вольной борьбе. Призёр чемпионата Европы, воспитал 14 мастеров спорта.</p><p className="text-white italic border-l-2 border-mat-red pl-4">«Борьба — это шахматы на ковре. Дисциплина важнее таланта, а чистый захват решает больше, чем чистая сила.»</p></div><div className="grid grid-cols-3 gap-4">{[["150+", "Видео-уроков"], ["12", "Программ"], ["4.9", "Оценка учеников"]].map(([number, label]) => <div key={label}><div className="font-display text-4xl">{number}</div><div className="text-[10px] uppercase font-bold text-white/50 mt-1">{label}</div></div>)}</div></div>
        </div>
      </section>

      <section className="relative bg-mat-black py-24 overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 pointer-events-none"><div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-mat-red/20 blur-[120px] rounded-full animate-flame" /><div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-mat-blue/20 blur-[120px] rounded-full animate-flame" /></div>
        <div className="relative mb-16 overflow-hidden"><div className="flex whitespace-nowrap animate-marquee">{[0, 1].map((loop) => <div key={loop} className="flex shrink-0">{champions.map((name) => <span key={`${loop}-${name}`} className="font-display text-7xl md:text-9xl uppercase text-transparent px-8" style={{ WebkitTextStroke: "1px oklch(0.98 0 0 / 0.35)" }}>{name} <span className="text-mat-red not-italic">★</span></span>)}</div>)}</div></div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"><div><span className="text-[10px] font-bold uppercase tracking-widest text-mat-red">Стена чемпионов</span><h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] mt-2">Кровь. Пот.<br /><span className="text-stroke-white">Золото.</span></h2></div><p className="max-w-sm text-sm text-white/50 leading-relaxed">За каждой цифрой — сломанные пальцы, порванные уши и часы на ковре в 5 утра. Присоединяйся к тем, кто выбрал путь борца.</p></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">{[["1 247", "Учеников на ковре", "text-mat-red"], ["38", "Мастеров спорта", "text-white"], ["6", "Олимпийских медалей", "text-mat-red"], ["24/7", "Доступ к урокам", "text-white"]].map(([number, label, accent]) => <div key={label} className="bg-mat-black p-8 hover:bg-mat-gray transition-colors group relative"><div className={`font-display text-6xl md:text-7xl italic ${accent} group-hover:scale-110 transition-transform origin-left`}>{number}</div><div className="text-[10px] font-bold uppercase tracking-widest text-white/60 mt-3">{label}</div><div className="absolute top-4 right-4 text-mat-red/30 group-hover:text-mat-red font-display text-xl transition-colors">✕</div></div>)}</div>
          <div className="mt-12 grid md:grid-cols-3 gap-4">{[["Меня выкинули из трёх залов. Здесь я стал чемпионом округа за 8 месяцев.", "Игорь · 17 лет"], ["Разбор в замедленном повторе — как будто тренер стоит рядом. Понял, наконец, вход в ногу.", "Тимур · 24 года"], ["Начал в 34. Через год выступил на ветеранском первенстве. ЗАХВАТ работает.", "Дмитрий · 35 лет"]].map(([quote, author]) => <blockquote key={author} className="border-l-2 border-mat-red bg-mat-gray/50 p-6 hover:bg-mat-gray transition-colors"><p className="text-white/80 italic leading-relaxed text-sm">«{quote}»</p><footer className="mt-4 text-[10px] font-bold uppercase tracking-widest text-mat-red">— {author}</footer></blockquote>)}</div>
        </div>
      </section>

      <section className="relative py-24 px-6 border-t border-white/10 overflow-hidden"><div className="absolute inset-0 bg-mat-red/10 blur-3xl" /><div className="max-w-4xl mx-auto text-center relative"><h2 className="font-display text-6xl md:text-8xl uppercase leading-[0.9] mb-6">Пора <span className="text-stroke-white">на ковёр</span></h2><p className="text-white/60 mb-10 max-w-lg mx-auto">Начни с бесплатного вводного курса: стойка, перемещения, базовые захваты. Первая тренировка — сегодня.</p><button onClick={() => openVideo("Хабиб Нурмагомедов vs Конор МакГрегор", "/videos/khabib-conor.mp4")} className="bg-mat-red px-10 py-5 font-display text-2xl uppercase tracking-wide hover:scale-105 transition-transform">Присоединиться к школе</button></div></section>

      <footer className="border-t border-white/10 py-12 px-6"><div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 text-white/40"><div className="text-[10px] font-bold uppercase tracking-[0.2em]">© 2026 ЗАХВАТ · Школа борьбы</div><div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em]"><a href="#" className="hover:text-white">Условия</a><a href="#" className="hover:text-white">Политика</a><a href="#" className="hover:text-white">Контакты</a></div></div></footer>

      {video && <div onClick={() => setVideo(null)} className="fixed inset-0 z-[100] bg-mat-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"><div onClick={(event) => event.stopPropagation()} className="relative w-full max-w-5xl bg-mat-black border border-white/10"><div className="flex items-center justify-between px-5 py-3 border-b border-white/10"><div className="text-[10px] font-bold uppercase tracking-widest text-mat-red">{video.title}</div><button onClick={() => setVideo(null)} aria-label="Закрыть" className="text-white/60 hover:text-white text-2xl leading-none">×</button></div><video src={video.src} controls autoPlay playsInline className="w-full aspect-video bg-black" /></div></div>}

      {trainingOpen && <div onClick={() => setTrainingOpen(false)} className="fixed inset-0 z-[100] bg-mat-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"><div onClick={(event) => event.stopPropagation()} className="relative w-full max-w-4xl bg-mat-black border border-white/10 grid md:grid-cols-2"><button onClick={() => setTrainingOpen(false)} aria-label="Закрыть" className="absolute top-3 right-4 z-10 text-white/60 hover:text-white text-3xl leading-none">×</button><div className="relative bg-mat-gray overflow-hidden">{exercise === "idle" ? <img src="/images/training-boy.jpg" alt="Ученик готов к тренировке" className="w-full h-full object-cover aspect-[4/5] md:aspect-auto" /> : <video ref={trainingVideo} key={exercise} src={exercise === "pushup" ? "/videos/boy-pushup.mp4" : "/videos/boy-pullup.mp4"} muted playsInline className="w-full h-full object-cover aspect-[4/5] md:aspect-auto bg-black" />}<div className="absolute bottom-4 left-4 bg-mat-red px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{exercise === "pushup" ? `Отжимание · ${pushups}` : exercise === "pullup" ? `Подтягивание · ${pullups}` : "Ученик · Готов"}</div></div><div className="p-8 flex flex-col justify-center gap-6"><div><span className="text-[10px] font-bold uppercase tracking-widest text-mat-red">Разминка</span><h3 className="font-display text-4xl uppercase leading-none mt-2">Выбери упражнение</h3><p className="text-white/60 text-sm mt-3">Нажимай кнопку — мальчик выполняет повтор. Отжимания и подтягивания считаются автоматически.</p></div><div className="grid gap-4"><button onClick={() => playExercise("pushup")} className="group flex items-center justify-between bg-mat-red hover:bg-white hover:text-mat-black transition-colors px-6 py-5"><span className="font-display text-2xl uppercase tracking-wide">Отжимание</span><span className="font-display text-3xl italic">{pushups}</span></button><button onClick={() => playExercise("pullup")} className="group flex items-center justify-between bg-mat-blue hover:bg-white hover:text-mat-black transition-colors px-6 py-5"><span className="font-display text-2xl uppercase tracking-wide">Подтягивание</span><span className="font-display text-3xl italic">{pullups}</span></button></div><button onClick={resetTraining} className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white self-start">Сбросить счётчик</button></div></div></div>}
    </main>
  );
}
