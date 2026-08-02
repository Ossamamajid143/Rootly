"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  usePageInView,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  image: {
    url: string;
    altText: string;
  };
  href: string;
  actionLabel: string;
}

interface HeroProductStageProps {
  slides: HeroSlide[];
}

const AUTOPLAY_SECONDS = 4.8;
const transitionEase = [0.22, 1, 0.36, 1] as const;

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

function getRelativePosition(index: number, current: number, length: number) {
  let position = index - current;
  const midpoint = length / 2;

  if (position > midpoint) position -= length;
  if (position < -midpoint) position += length;

  return position;
}

export function HeroProductStage({ slides }: HeroProductStageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cycleId, setCycleId] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isWideStage, setIsWideStage] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const isPageInView = usePageInView();
  const progress = useMotionValue(0);
  const progressAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const stageX = useMotionValue(0);
  const stageY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, {
    stiffness: 150,
    damping: 24,
    mass: 0.8,
  });
  const smoothTiltY = useSpring(tiltY, {
    stiffness: 150,
    damping: 24,
    mass: 0.8,
  });
  const smoothStageX = useSpring(stageX, {
    stiffness: 140,
    damping: 24,
    mass: 0.85,
  });
  const smoothStageY = useSpring(stageY, {
    stiffness: 140,
    damping: 24,
    mass: 0.85,
  });
  const glowX = useTransform(smoothStageX, [-8, 8], [-3, 3]);
  const glowY = useTransform(smoothStageY, [-6, 6], [-2, 2]);

  const autoplayPaused =
    slides.length <= 1 ||
    Boolean(shouldReduceMotion) ||
    isHovered ||
    hasFocus ||
    isDragging ||
    !isPageInView;

  const showSlide = useCallback(
    (nextIndex: number, announce = true) => {
      const normalizedIndex = (nextIndex + slides.length) % slides.length;
      const nextSlide = slides[normalizedIndex];

      setCurrentIndex(normalizedIndex);
      setCycleId((value) => value + 1);
      setAnnouncement(
        announce && nextSlide
          ? `${nextSlide.title}, slide ${normalizedIndex + 1} of ${slides.length}`
          : "",
      );
    },
    [slides],
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const updateStageSize = () => setIsWideStage(media.matches);

    updateStageSize();
    media.addEventListener("change", updateStageSize);
    return () => media.removeEventListener("change", updateStageSize);
  }, []);

  useEffect(() => {
    if (slides.length <= 1 || shouldReduceMotion) {
      progress.set(0);
      return;
    }

    progress.set(0);
    const controls = animate(progress, 1, {
      duration: AUTOPLAY_SECONDS,
      ease: "linear",
      onComplete: () => {
        setAnnouncement("");
        setCurrentIndex((index) => (index + 1) % slides.length);
      },
    });

    progressAnimation.current = controls;

    return () => {
      controls.stop();
      progressAnimation.current = null;
    };
  }, [currentIndex, cycleId, progress, shouldReduceMotion, slides.length]);

  useEffect(() => {
    const controls = progressAnimation.current;
    if (!controls) return;

    if (autoplayPaused) {
      controls.pause();
    } else {
      controls.play();
    }
  }, [autoplayPaused]);

  if (slides.length === 0) {
    return null;
  }

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
    stageX.set(0);
    stageY.set(0);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!isWideStage || shouldReduceMotion || event.pointerType === "touch") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    tiltX.set(vertical * -6);
    tiltY.set(horizontal * 8);
    stageX.set(horizontal * 16);
    stageY.set(vertical * 12);
  };

  const cardState = (position: number) => {
    if (position === 0) {
      return { x: 0, y: 0, scale: 1, rotateY: 0, rotateZ: 0, opacity: 1 };
    }

    const direction = position < 0 ? -1 : 1;

    return {
      x: isWideStage ? `${direction * 29}%` : `${direction * 18}%`,
      y: isWideStage ? 26 : 18,
      scale: isWideStage ? 0.84 : 0.86,
      rotateY: isWideStage ? direction * -16 : direction * -8,
      rotateZ: direction * 3,
      opacity: isWideStage ? 0.64 : 0.56,
    };
  };

  return (
    <section
      aria-label="Featured ROOTLY products"
      aria-roledescription="carousel"
      className="relative mx-auto h-[430px] w-full max-w-[720px] overflow-hidden min-[360px]:h-[460px] min-[400px]:h-[510px] sm:h-[540px] md:h-[560px] lg:h-[590px] xl:h-[620px]"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetTilt();
      }}
      onPointerMove={handlePointerMove}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHasFocus(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showSlide(currentIndex + 1);
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showSlide(currentIndex - 1);
        }
      }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[44%] size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/20 blur-3xl sm:size-96"
        style={{ x: glowX, y: glowY }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1, 1.035, 1], opacity: [0.6, 0.8, 0.6] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[44%] hidden h-[78%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-brand/15 md:block"
      />

      <motion.div
        data-hero-stage-plane
        className="absolute inset-0"
        style={{
          x: smoothStageX,
          y: smoothStageY,
          rotateX: smoothTiltX,
          rotateY: smoothTiltY,
          transformStyle: "preserve-3d",
        }}
      >
        {slides.map((slide, index) => {
          const position = getRelativePosition(
            index,
            currentIndex,
            slides.length,
          );

          if (Math.abs(position) > 1) return null;

          const isActive = position === 0;

          return (
            <div
              key={slide.id}
              className="pointer-events-none absolute inset-x-0 top-2 flex justify-center sm:top-3 md:top-4"
              style={{ zIndex: isActive ? 30 : 10 }}
              aria-hidden={!isActive}
            >
              <motion.div
                data-card-position={position}
                className={`pointer-events-auto relative aspect-[4/5] w-[82vw] max-w-[350px] overflow-hidden rounded-[1.5rem] border border-border bg-sand sm:w-[370px] sm:max-w-[370px] md:w-[390px] md:max-w-[390px] md:rounded-[1.75rem] lg:w-[410px] lg:max-w-[410px] xl:w-[440px] xl:max-w-[440px] ${
                  isActive
                    ? "shadow-[0_24px_60px_rgba(46,68,50,0.2)]"
                    : "shadow-[0_14px_35px_rgba(46,68,50,0.1)]"
                }`}
                initial={{ opacity: 0, scale: 0.72, y: 34 }}
                animate={cardState(position)}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.15, ease: transitionEase }
                    : {
                        type: "spring",
                        stiffness: 130,
                        damping: 22,
                        mass: 0.9,
                      }
                }
              >
                <motion.div
                  className="size-full"
                  drag={
                    isActive && !isWideStage && !shouldReduceMotion
                      ? "x"
                      : false
                  }
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.08}
                  dragSnapToOrigin
                  style={{ touchAction: "pan-y" }}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(_, info) => {
                    setIsDragging(false);

                    if (info.offset.x < -56 || info.velocity.x < -520) {
                      showSlide(currentIndex + 1);
                    } else if (
                      info.offset.x > 56 ||
                      info.velocity.x > 520
                    ) {
                      showSlide(currentIndex - 1);
                    }
                  }}
                  animate={
                    isActive &&
                    !shouldReduceMotion &&
                    !isHovered &&
                    !hasFocus &&
                    !isDragging &&
                    isPageInView
                      ? { y: [0, -6, 0], rotateZ: [-0.4, 0.4, -0.4] }
                      : { y: 0, rotateZ: 0 }
                  }
                  transition={{
                    duration: 6.2,
                    repeat:
                      isActive &&
                      !shouldReduceMotion &&
                      !isHovered &&
                      !hasFocus &&
                      !isDragging &&
                      isPageInView
                        ? Infinity
                        : 0,
                    ease: "easeInOut",
                  }}
                >
                  {isActive ? (
                    <Link
                      href={slide.href}
                      aria-label={`${slide.actionLabel}: ${slide.title}`}
                      className="group relative block size-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                    >
                      <Image
                        src={slide.image.url}
                        alt={slide.image.altText}
                        fill
                        priority={currentIndex === 0}
                        sizes="(max-width: 639px) 82vw, (max-width: 767px) 370px, (max-width: 1023px) 390px, (max-width: 1279px) 410px, 440px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.015] motion-reduce:transform-none"
                      />
                      <motion.div
                        className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/95 via-forest/78 to-transparent px-5 pb-5 pt-16 text-white"
                        initial={
                          shouldReduceMotion
                            ? { opacity: 1 }
                            : { opacity: 0, y: 8 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: shouldReduceMotion ? 0 : 0.12,
                          duration: shouldReduceMotion ? 0.15 : 0.35,
                          ease: transitionEase,
                        }}
                      >
                        <p className="font-display text-2xl font-semibold leading-none text-white sm:text-3xl">
                          {slide.title}
                        </p>
                        <div className="mt-2 flex items-center justify-between gap-3">
                          <p className="truncate text-xs text-white/75">
                            {slide.subtitle}
                          </p>
                          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-white">
                            {slide.actionLabel}
                            <ArrowUpRight
                              size={14}
                              strokeWidth={1.8}
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  ) : (
                    <div className="relative size-full">
                      <Image
                        src={slide.image.url}
                        alt=""
                        fill
                        sizes="(max-width: 639px) 72vw, (max-width: 1023px) 330px, 370px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-forest/10" />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      <span className="absolute right-2 top-2 z-40 rounded-full bg-forest px-3 py-2 text-xs font-semibold text-white shadow-sm sm:right-4 sm:top-4">
        {formatNumber(currentIndex + 1)} / {formatNumber(slides.length)}
      </span>

      <button
        type="button"
        aria-label="Show previous product"
        onClick={() => showSlide(currentIndex - 1)}
        className="absolute left-1 top-[44%] z-40 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-forest text-white shadow-md transition-transform hover:scale-[1.04] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none sm:left-3 md:left-5"
      >
        <ChevronLeft size={20} strokeWidth={1.8} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Show next product"
        onClick={() => showSlide(currentIndex + 1)}
        className="absolute right-1 top-[44%] z-40 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-forest text-white shadow-md transition-transform hover:scale-[1.04] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transform-none sm:right-3 md:right-5"
      >
        <ChevronRight size={20} strokeWidth={1.8} aria-hidden="true" />
      </button>

      <div className="absolute bottom-0 left-1/2 z-40 flex -translate-x-1/2 items-center rounded-full border border-border bg-surface/95 px-1 shadow-sm backdrop-blur-sm">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.title}`}
            aria-current={index === currentIndex ? "true" : undefined}
            onClick={() => showSlide(index)}
            className="group flex size-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <span
              className={`block size-1.5 rounded-full transition-[background-color,transform] duration-200 group-hover:scale-125 group-active:scale-90 motion-reduce:transform-none ${
                index === currentIndex ? "scale-150 bg-brand" : "bg-border"
              }`}
            />
          </button>
        ))}
        {!shouldReduceMotion && slides.length > 1 && (
          <div className="absolute inset-x-3 bottom-0 h-px overflow-hidden bg-border">
            <motion.div
              className="h-full origin-left bg-brand"
              style={{ scaleX: progress }}
            />
          </div>
        )}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </section>
  );
}
