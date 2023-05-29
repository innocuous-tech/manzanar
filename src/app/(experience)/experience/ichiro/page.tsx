'use client'; // TODO: Fix server-client directives by splitting stuff out

import { ClipboardQuestion } from '@/app/(experience)/_components/ClipboardQuestion';
import { ContinueButton } from '@/app/(experience)/_components/ContinueButton';
import { Q27 } from '@/app/(experience)/_components/Q27';
import { Q28 } from '@/app/(experience)/_components/Q28';
import { QCustom } from '@/app/(experience)/_components/QCustom';
import { IchiroStatement } from '@/app/(experience)/experience/ichiro/IchiroStatement';
import { UserStatement } from '@/app/(experience)/experience/ichiro/UserStatement';
import { cms } from '@/cms';
import { AutoExpandingTextArea } from '@/components/AutoExpandingTextArea';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { Tooltip } from '@/components/Tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactComponent as TranscriptIcon } from 'public/icons/transcript.svg';
import { useState } from 'react';

export default function Page() {
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [questionsAsked, setQuestionsAsked] = useState<number>(0);
  const incrementQuestionsAsked = () => setQuestionsAsked((prev) => prev + 1);

  const [step, setStep] = useState<'0.0' | '0.1' | 'q27' | 'q28' | 'custom'>(
    '0.0',
  );

  const [remainingQuestions, setRemainingQuestions] = useState([27, 28]);
  const [transcript, setTranscript] = useState<
    { origin: 'user' | 'ichiro'; message: string }[]
  >([{ origin: 'ichiro', message: cms['0.0'] }]);

  const goToQ27 = () => {
    setTranscript((prev) => [...prev, { origin: 'user', message: cms.q27 }]);
    incrementQuestionsAsked();
    setRemainingQuestions((prev) => prev.filter((q) => q !== 27));
    setStep('q27');
  };

  const goToQ28 = () => {
    setTranscript((prev) => [...prev, { origin: 'user', message: cms.q28 }]);
    incrementQuestionsAsked();
    setRemainingQuestions((prev) => prev.filter((q) => q !== 28));
    setStep('q28');
  };

  const goToQCustom = (customMessage: string) => {
    setTranscript((prev) => [
      ...prev,
      { origin: 'user', message: customMessage },
    ]);
    incrementQuestionsAsked();
    setCustomQuestion(customMessage);
    setStep('custom');
  };

  const mostRecentTranscriptEntry = transcript.at(-1);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        className="flex h-full flex-col justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {step === '0.0' && (
          <>
            <aside className="panel block">{cms['start']}</aside>

            <motion.section
              className="bottom-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 1 }}
            >
              <IchiroStatement>{cms['0.0']}</IchiroStatement>

              <ContinueButton onClick={() => setStep('0.1')} />
            </motion.section>
          </>
        )}

        {step === '0.1' && (
          <>
            {mostRecentTranscriptEntry && (
              <aside className="panel block">
                {mostRecentTranscriptEntry.origin === 'ichiro' ? (
                  <IchiroStatement>
                    {mostRecentTranscriptEntry.message}
                  </IchiroStatement>
                ) : (
                  <UserStatement>
                    {mostRecentTranscriptEntry.message}
                  </UserStatement>
                )}
              </aside>
            )}

            <div className="fixed inset-0 top-[unset]">
              {/* `right` and `scale` are directly related */}
              <aside className="absolute -right-4 -top-[28rem] flex hidden h-[28rem] w-96 origin-bottom scale-75 flex-col bg-[url('/images/clipboard.webp')] bg-cover md:block xl:right-4 xl:scale-90 2xl:right-8 2xl:scale-100">
                <div className="typography-clipboard flex flex-col gap-4 px-8 pt-48 text-darkBrownText">
                  <header>
                    OBJECTIVE:
                    <br />
                    INTERROGATE ICHIRO
                  </header>

                  <div className="flex flex-col gap-3">
                    <ClipboardQuestion
                      label="Question 27:"
                      isWrongAnswerScribbled={false}
                    />
                    <ClipboardQuestion
                      label="Question 28:"
                      isWrongAnswerScribbled={false}
                    />
                  </div>
                </div>
              </aside>

              <section className="justify-0.0 relative z-10 flex flex-col items-center gap-6 bg-darkBrownOverlay p-4 sm:h-80 sm:gap-8 sm:px-16 sm:py-12">
                <div className="flex w-full flex-col gap-4 sm:w-[unset] sm:flex-row sm:gap-16">
                  <Tooltip content={`Question 27: ${cms.q27}`}>
                    <Button
                      onClick={goToQ27}
                      disabled={!remainingQuestions.includes(27)}
                    >
                      Ask question 27
                    </Button>
                  </Tooltip>

                  <Tooltip content={`Question 28: ${cms.q28}`}>
                    <Button
                      onClick={goToQ28}
                      disabled={!remainingQuestions.includes(28)}
                    >
                      Ask question 28
                    </Button>
                  </Tooltip>
                </div>

                <div className="flex w-full items-center gap-6 sm:max-w-[var(--usualMaxWidth)] sm:gap-10">
                  <AutoExpandingTextArea
                    onSubmit={({ aetextarea }) => goToQCustom(aetextarea)}
                    label="Custom Message For Ichiro To Respond To"
                    placeholder="Type something to say to Ichiro"
                  />

                  <IconButton
                    label="Open Transcript"
                    className="hidden sm:block"
                  >
                    <TranscriptIcon />
                  </IconButton>
                </div>
              </section>
            </div>
          </>
        )}

        {step === 'q27' && (
          <Q27
            setTranscript={setTranscript}
            onComplete={() => setStep('0.1')}
          />
        )}

        {step === 'q28' && (
          <Q28
            setTranscript={setTranscript}
            onComplete={() => setStep('0.1')}
          />
        )}

        {step === 'custom' && (
          <QCustom
            message={customQuestion}
            setTranscript={setTranscript}
            onComplete={() => setStep('0.1')}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}