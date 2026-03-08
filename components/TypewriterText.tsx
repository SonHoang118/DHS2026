"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const completedTypewriterKeys = new Set<string>();

type TypewriterTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type TypewriterTextProps = {
    as?: TypewriterTag;
    text: string;
    delay?: number;
    speed?: number;
    variance?: number;
    humanize?: boolean;
    cursorWidth?: number;
    className?: string;
    showCursor?: boolean;
    punctuationPauseMs?: number;
    startWhenAncestorVisible?: boolean;
    onceKey?: string;
};

const PUNCTUATION = new Set([".", ",", "!", "?", ";", ":"]);

function getNextDelay(
    char: string,
    speed: number,
    variance: number,
    punctuationPauseMs: number,
    humanize: boolean,
    previousDelay: number,
) {
    const baseDelay = 1000 / Math.max(1, speed);
    if (!humanize) {
        return Math.max(15, baseDelay);
    }

    const jitter = baseDelay * variance * (Math.random() * 2 - 1);
    const hesitation = Math.random() < 0.06 ? 25 + Math.random() * 65 : 0;
    const punctuationPause = PUNCTUATION.has(char) ? punctuationPauseMs : 0;
    const rawDelay = Math.max(15, baseDelay + jitter + hesitation + punctuationPause);

    // Smooth timing between chars so the rhythm feels less jerky.
    return previousDelay * 0.62 + rawDelay * 0.38;
}

export default function TypewriterText({
    as = "span",
    text,
    delay = 0,
    speed = 40,
    variance = 0.16,
    humanize = true,
    cursorWidth = 10,
    className,
    showCursor = true,
    punctuationPauseMs = 110,
    startWhenAncestorVisible = false,
    onceKey,
}: TypewriterTextProps) {
    const [visibleLength, setVisibleLength] = useState(() => {
        if (onceKey && completedTypewriterKeys.has(onceKey)) {
            return text.length;
        }
        return 0;
    });
    const [canStart, setCanStart] = useState(!startWhenAncestorVisible);
    const hostRef = useRef<HTMLElement | null>(null);
    const previousDelayRef = useRef(1000 / Math.max(1, speed));
    const content = useMemo(() => text.slice(0, visibleLength), [text, visibleLength]);
    const isComplete = visibleLength >= text.length;
    const Tag = as;
    const caretThickness = Math.max(1, Math.round(cursorWidth));

    useEffect(() => {
        if (onceKey && completedTypewriterKeys.has(onceKey)) {
            setVisibleLength(text.length);
            return;
        }

        setVisibleLength(0);
        previousDelayRef.current = 1000 / Math.max(1, speed);
    }, [onceKey, text]);

    useEffect(() => {
        previousDelayRef.current = 1000 / Math.max(1, speed);
    }, [speed, humanize]);

    useEffect(() => {
        if (!startWhenAncestorVisible) {
            setCanStart(true);
            return;
        }

        const hostNode = hostRef.current;
        if (!hostNode) {
            return;
        }

        const revealContainer = hostNode.closest("[data-reveal-visible]");
        if (!revealContainer) {
            setCanStart(true);
            return;
        }

        const isVisible = revealContainer.getAttribute("data-reveal-visible") === "true";
        setCanStart(isVisible);

        if (isVisible) {
            return;
        }

        const observer = new MutationObserver(() => {
            const currentVisible = revealContainer.getAttribute("data-reveal-visible") === "true";
            if (currentVisible) {
                setCanStart(true);
                observer.disconnect();
            }
        });

        observer.observe(revealContainer, {
            attributes: true,
            attributeFilter: ["data-reveal-visible"],
        });

        return () => observer.disconnect();
    }, [startWhenAncestorVisible]);

    useEffect(() => {
        if (onceKey && completedTypewriterKeys.has(onceKey)) {
            return;
        }

        if (!canStart) {
            return;
        }

        if (visibleLength >= text.length) {
            return;
        }

        const nextChar = text[visibleLength] ?? "";
        const nextDelay = getNextDelay(
            nextChar,
            speed,
            variance,
            punctuationPauseMs,
            humanize,
            previousDelayRef.current,
        );
        previousDelayRef.current = nextDelay;

        const timeout = window.setTimeout(() => {
            setVisibleLength((current) => {
                const next = current + 1;
                if (onceKey && next >= text.length) {
                    completedTypewriterKeys.add(onceKey);
                }
                return next;
            });
        }, nextDelay + (visibleLength === 0 ? Math.max(0, delay) : 0));

        return () => window.clearTimeout(timeout);
    }, [canStart, delay, humanize, onceKey, visibleLength, punctuationPauseMs, speed, text, variance]);

    return (
        <Tag ref={hostRef as never} className={className}>
            {content}
            {showCursor && !isComplete && visibleLength > 0 ? (
                <span
                    aria-hidden="true"
                    className="typewriter-cursor"
                    style={{
                        display: "inline-block",
                        width: "0",
                        height: "1em",
                        marginLeft: "0.12em",
                        verticalAlign: "-0.12em",
                        borderRight: `${caretThickness}px solid currentColor`,
                        animation: "typewriter-caret-blink 1s step-end infinite",
                    }}
                />
            ) : null}
        </Tag>
    );
}
