"use client";

import { useEffect, useMemo, useState } from "react";

type AiWorkProject = {
  title: string;
  description: string;
  coverUrl: string;
  videoUrl: string;
};

type AiWorksChatProps = {
  promptText: string;
  replyText: string;
  caption: string;
  projects: AiWorkProject[];
};

export default function AiWorksChat({
  promptText,
  replyText,
  caption,
  projects,
}: AiWorksChatProps) {
  const [typedPrompt, setTypedPrompt] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [typedReply, setTypedReply] = useState("");
  const [activeProject, setActiveProject] = useState<AiWorkProject | null>(null);

  useEffect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    const schedule = (callback: () => void, delay: number) => {
      const timer = setTimeout(callback, delay);
      timers.push(timer);
    };

    for (let index = 1; index <= promptText.length; index += 1) {
      schedule(() => setTypedPrompt(promptText.slice(0, index)), index * 26);
    }

    const sendAt = promptText.length * 26 + 520;
    schedule(() => setIsSent(true), sendAt);
    schedule(() => setIsThinking(true), sendAt + 520);
    schedule(() => setIsThinking(false), sendAt + 2100);

    for (let index = 1; index <= replyText.length; index += 1) {
      schedule(
        () => setTypedReply(replyText.slice(0, index)),
        sendAt + 2100 + index * 12,
      );
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [promptText, replyText]);

  const replyParagraphs = useMemo(
    () => typedReply.split("\n\n").filter(Boolean),
    [typedReply],
  );
  const shouldShowProjects =
    projects.length > 0 &&
    replyText.length > 0 &&
    typedReply.length === replyText.length;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <div className="absolute left-0 right-0 top-[92px] z-20 flex h-14 items-center justify-between px-4 sm:px-7 md:px-11">
        <div className="flex items-center gap-1.5 text-[21px] font-semibold tracking-[-0.03em]">
          <span>ChatGPT</span>
          <span className="mt-1 h-2.5 w-2.5 rotate-45 border-b-2 border-r-2 border-white/75" />
        </div>
        <div className="flex items-center gap-5 text-sm font-semibold">
          <button
            type="button"
            className="hidden items-center gap-2 text-white sm:flex"
            aria-label="Share"
          >
            <span className="relative block h-5 w-5 rounded-md border-2 border-white before:absolute before:left-1/2 before:top-[-7px] before:h-3 before:w-0.5 before:-translate-x-1/2 before:bg-white after:absolute after:left-1/2 after:top-[-7px] after:h-2 after:w-2 after:-translate-x-1/2 after:-rotate-45 after:border-r-2 after:border-t-2 after:border-white" />
            <span>Share</span>
          </button>
          <button
            type="button"
            className="text-2xl leading-none text-white"
            aria-label="More options"
          >
            ...
          </button>
        </div>
      </div>

      <section className="mx-auto flex min-h-screen w-full max-w-[960px] flex-col px-5 pb-44 pt-[170px] md:pb-48">
        {isSent ? (
          <div className="ml-auto w-full max-w-[672px] animate-[chat-pop_420ms_ease-out] rounded-[28px] bg-[#2f2f2f] px-5 py-4 text-[18px] font-medium leading-[1.45] text-white shadow-[0_8px_30px_rgba(0,0,0,0.28)] sm:px-6 md:text-[19px]">
            {promptText}
          </div>
        ) : null}

        <article className="mt-14 max-w-[960px] text-[18px] font-medium leading-[1.65] tracking-[-0.02em] text-white md:mt-13 md:text-[20px]">
          {isThinking ? (
            <div className="flex items-center gap-2 text-white/70">
              <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-240ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-120ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-white/60" />
            </div>
          ) : null}

          {replyParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className={index === 0 ? undefined : index === 1 ? "mt-5" : "mt-7"}
            >
              {paragraph}
              {index === replyParagraphs.length - 1 &&
              typedReply.length < replyText.length ? (
                <span className="ml-1 inline-block h-5 w-0.5 translate-y-0.5 animate-pulse bg-white" />
              ) : null}
            </p>
          ))}

          {shouldShowProjects ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <button
                  key={`${project.title}-${index}`}
                  type="button"
                  className="group relative aspect-[1.55] overflow-hidden rounded-2xl border border-white/10 bg-[#171717] text-left shadow-[0_12px_36px_rgba(0,0,0,0.35)] outline-none animate-[card-rise_520ms_ease-out_both] transition-transform duration-200 hover:-translate-y-1 focus-visible:border-white/70"
                  style={{ animationDelay: `${index * 90}ms` }}
                  onClick={() => {
                    if (project.videoUrl) {
                      setActiveProject(project);
                    }
                  }}
                  aria-label={
                    project.videoUrl
                      ? `Open ${project.title} video`
                      : `${project.title} has no video`
                  }
                >
                  {project.coverUrl ? (
                    <img
                      src={project.coverUrl}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="absolute inset-0 bg-[#242424]" />
                  )}
                  <span className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-4">
                    <span className="block text-base font-semibold leading-tight text-white">
                      {project.title}
                    </span>
                    {project.description ? (
                      <span className="mt-1 line-clamp-2 block text-xs leading-snug text-white/70">
                        {project.description}
                      </span>
                    ) : null}
                  </span>
                  {project.videoUrl ? (
                    <span className="absolute right-3 top-3 rounded-full bg-black/65 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
                      Play
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}
        </article>
      </section>

      <footer className="fixed inset-x-0 bottom-0 z-30 bg-black px-5 pb-4 md:pb-5">
        <div className="mx-auto max-w-[960px]">
          <div className="flex h-16 items-center gap-4 rounded-full bg-[#262626] px-5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] md:h-[66px] md:px-6">
            <button
              type="button"
              className="relative h-6 w-6 shrink-0 text-white"
              aria-label="Add attachment"
            >
              <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-white" />
              <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-white" />
            </button>
            <div className="h-8 w-px shrink-0 bg-white/50" />
            <p className="min-w-0 flex-1 truncate text-[18px] text-[#b8b8b8] md:text-[19px]">
              {isSent ? "Ask anything" : typedPrompt}
              {!isSent ? (
                <span className="ml-0.5 inline-block h-5 w-px translate-y-1 animate-pulse bg-white/80" />
              ) : null}
            </p>
            <button
              type="button"
              className="hidden h-8 w-8 shrink-0 items-center justify-center text-white sm:flex"
              aria-label="Voice input"
            >
              <span className="relative block h-5 w-3 rounded-b-full rounded-t-full border-2 border-white before:absolute before:-bottom-1.5 before:left-1/2 before:h-1.5 before:w-0.5 before:-translate-x-1/2 before:bg-white after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-4 after:-translate-x-1/2 after:bg-white" />
            </button>
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4b4b4b]"
              aria-label="Stop response"
            >
              <span className="h-3.5 w-3.5 rounded-[3px] bg-white" />
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-[#b6b6b6] md:text-sm">
            {caption}
          </p>
        </div>
      </footer>
      {activeProject ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-5 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} video`}
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="truncate pr-4 text-sm font-semibold text-white">
                {activeProject.title}
              </p>
              <button
                type="button"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xl leading-none text-white transition-colors hover:bg-white/20"
                onClick={() => setActiveProject(null)}
                aria-label="Close video"
              >
                x
              </button>
            </div>
            <video
              src={activeProject.videoUrl}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-black object-contain"
            />
          </div>
        </div>
      ) : null}
      <style jsx>{`
        @keyframes chat-pop {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes card-rise {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
