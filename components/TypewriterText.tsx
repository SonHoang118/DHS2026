"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
}: TypewriterTextProps) {
    const [visibleLength, setVisibleLength] = useState(0);
    const previousDelayRef = useRef(1000 / Math.max(1, speed));
    const content = useMemo(() => text.slice(0, visibleLength), [text, visibleLength]);
    const isComplete = visibleLength >= text.length;
    const Tag = as;
    const caretThickness = Math.max(1, Math.round(cursorWidth));

    useEffect(() => {
        setVisibleLength(0);
        previousDelayRef.current = 1000 / Math.max(1, speed);
    }, [text]);

    useEffect(() => {
        previousDelayRef.current = 1000 / Math.max(1, speed);
    }, [speed, humanize]);

    useEffect(() => {
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
            setVisibleLength((current) => current + 1);
        }, nextDelay + (visibleLength === 0 ? Math.max(0, delay) : 0));

        return () => window.clearTimeout(timeout);
    }, [delay, humanize, visibleLength, punctuationPauseMs, speed, text, variance]);

    return (
        <Tag className={className}>
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
